import { ThemeColor } from "@/store/useStore";

export const getThemeStyles = (theme: ThemeColor) => {
  switch (theme) {
    case 'pink':
      return {
        bg: "bg-pink-600 dark:bg-pink-500 text-white",
        bgLight: "bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-400",
        border: "border-pink-600 dark:border-pink-500",
        textHighlight: "text-pink-600 dark:text-pink-400",
        ring: "focus:ring-pink-500",
        hoverBg: "hover:bg-pink-700 dark:hover:bg-pink-600",
      };
    case 'blue':
      return {
        bg: "bg-blue-600 dark:bg-blue-500 text-white",
        bgLight: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400",
        border: "border-blue-600 dark:border-blue-500",
        textHighlight: "text-blue-600 dark:text-blue-400",
        ring: "focus:ring-blue-500",
        hoverBg: "hover:bg-blue-700 dark:hover:bg-blue-600",
      };
    case 'neutral':
    default:
      return {
        bg: "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900",
        bgLight: "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100",
        border: "border-zinc-900 dark:border-zinc-50",
        textHighlight: "text-zinc-900 dark:text-zinc-50",
        ring: "focus:ring-zinc-500",
        hoverBg: "hover:bg-zinc-800 dark:hover:bg-zinc-200",
      };
  }
};
