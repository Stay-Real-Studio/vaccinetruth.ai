import Link from "next/link";
import { useTranslation } from "react-i18next";

import { LanguageSelect } from "@/app/chat/components/LanguageSelect";
import { QuivrLogo } from "@/lib/assets/QuivrLogo";
import { ThemeSelectVT } from "@/lib/components/ThemeSelectVT";
import { cn } from "@/lib/utils";

import { PopoverMenuMobile } from "./components/PopoverMenuMobile";
import { useHomeHeader } from "./hooks/useHomeHeader";
import { linkStyle } from "./styles";

type HomeNavProps = {
  color?: "white" | "black";
};

export const HomeHeader = ({ color = "white" }: HomeNavProps): JSX.Element => {
  const { navLinks } = useHomeHeader({ color });
  const { t } = useTranslation(["vaccineTruth"]);

  return (
    <div className="w-full bg-gradient-to-b from-sky-400 to-sky-900 fixed top-0 z-50">
      <header className="flex justify-between items-center p-3 sm:p-5 min-w-max md:max-w-6xl mx-auto ">
        <Link
          href="/"
          className={cn(
            "text-base lg:text-xl flex gap-2 items-center",
            linkStyle[color],
            color === "black" ? "hover:text-vt-700" : "hover:text-vt-50"
          )}
        >
          <QuivrLogo size={64} color={color} />
          <div className="bg-clip-text text-transparent bg-gradient-to-br from-vt-50 to-vt-50">
            {t("vaccineTruthAi")}
          </div>
        </Link>
        <div className="hidden sm:flex sm:items-center">
          <ThemeSelectVT isChatPage={false} />
          <LanguageSelect isSelect={true} />
          <ul className="flex gap-4 items-center">{navLinks("desktop")}</ul>
        </div>
        <div className="md:hidden z-10">
          <PopoverMenuMobile navLinks={navLinks("mobile")} color={color} />
        </div>
      </header>
    </div>
  );
};
