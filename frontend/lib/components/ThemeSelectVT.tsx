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
              ? "sm:text-vt-400   hover:text-vt-600 "
              : "sm:text-vt-600   dark:sm:text-vt-50 sm:px-3 homePageText"
          }   text-vt-700 cursor-pointer  text-xs  bg-transparent py-1.5  text-left sm:text-sm sm:leading-6 dark:text-vt-200`}
        >
          {theme === "dark" ? <CiDark /> : <BsSun />}
        </button>
      </div>
    </div>
  );
};
