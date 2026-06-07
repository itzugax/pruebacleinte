import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-8 mt-12 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-zinc-500 dark:text-zinc-500">
        <p>
          Desarrollado por <span className="font-semibold text-zinc-900 dark:text-zinc-400">Ugax Lab</span>
        </p>
        <Link href="/admin" className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">
          Panel de Administración
        </Link>
      </div>
    </footer>
  );
}
