"use client";

// eslint-disable-next-line import/no-extraneous-dependencies
import { BsSun } from "react-icons/bs";
import { CiDark } from "react-icons/ci";

import { useTheme } from "@/app/user/components/ThemeSelect/hooks/useTheme";

export const ThemeSelectVT = ({
  isChatPage,
}: {
  isChatPage: boolean;
}): JSX.Element => {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <div className={`${isChatPage ? "mx-0" : "mx-2"}`}>
      <div>
        <button
          onClick={() => handleToggleTheme()}
          className={`${
            isChatPage
              ? "sm:text-black dark:sm:text-black dark:text-black hover:text-primary dark:sm:text-slate-700 dark:hover:text-slate-900"
              : "sm:text-white hover:text-slate-200 dark:text-white dark:sm:text-white sm:px-3"
          }   text-black cursor-pointer  text-xs  bg-transparent py-1.5  text-left sm:text-sm sm:leading-6`}
        >
          {theme === "dark" ? <CiDark /> : <BsSun />}
        </button>
      </div>
    </div>
  );
};