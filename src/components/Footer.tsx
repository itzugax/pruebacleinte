import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-8 text-center text-sm text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800 transition-colors mt-auto">
      <p>© {new Date().getFullYear()} California Surf & Skate Shop. Todos los derechos reservados.</p>
      <Link href="/admin" className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 underline mt-2 inline-block">
        Panel de Administración
      </Link>
    </footer>
  );
}
