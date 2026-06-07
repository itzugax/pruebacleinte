import { ThemeColor } from "@/store/useStore";

export const getThemeStyles = (theme?: ThemeColor) => {
  return {
    bg: "bg-orange-500 text-white",
    bgLight: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
    border: "border-orange-500 dark:border-orange-500",
    textHighlight: "text-orange-500 dark:text-orange-400",
    ring: "focus:ring-orange-500",
    hoverBg: "hover:bg-orange-600 dark:hover:bg-orange-600",
  };
};
