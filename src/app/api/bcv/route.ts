import { NextResponse } from 'next/server';
import https from 'https';

let cache: { rate: number; timestamp: number } | null = null;
const CACHE_DURATION_MS = 10 * 60 * 1000; // 10 minutos

function fetchBCVPage(): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get('https://www.bcv.org.ve', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      agent: new https.Agent({ rejectUnauthorized: false }),
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function scrapeBCV(): Promise<number | null> {
  try {
    const html = await fetchBCVPage();
    const cheerio = await import('cheerio');
    const $ = cheerio.load(html);

    const selectors = [
      '#dolar',
      '.view-tasa-de-cambio .views-row .field-content',
      '.field--name-field-tasa-de-cambio .field__item',
      '#block-visor-tasas-cambiarias .col-sm-6:first .field-content',
    ];

    for (const selector of selectors) {
      const el = $(selector).first();
      if (el.length) {
        const val = el.text().trim();
        const match = val.match(/(\d{1,3}(?:\.\d{3})*,\d+)/);
        if (match) {
          const num = parseFloat(match[1].replace(/\./g, '').replace(',', '.'));
          if (!isNaN(num) && num > 0) return num;
        }
      }
    }

    const match = $('body').text().match(/(\d{1,2},\d{4,})/);
    if (match) {
      const num = parseFloat(match[1].replace(',', '.'));
      if (!isNaN(num) && num > 0) return num;
    }

    return null;
  } catch {
    return null;
  }
}

export async function GET() {
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION_MS) {
    return NextResponse.json({ tasa: cache.rate, fuente: 'cache', actualizado: new Date(cache.timestamp).toISOString() });
  }

  const tasa = await scrapeBCV();

  if (!tasa || isNaN(tasa) || tasa <= 0) {
    if (cache) {
      return NextResponse.json({ tasa: cache.rate, fuente: 'cache_stale', actualizado: new Date(cache.timestamp).toISOString() });
    }
    return NextResponse.json({ tasa: 0, fuente: 'fallback', actualizado: new Date().toISOString() });
  }

  cache = { rate: tasa, timestamp: Date.now() };
  return NextResponse.json({ tasa, fuente: 'bcv_scraping', actualizado: new Date().toISOString() });
}
