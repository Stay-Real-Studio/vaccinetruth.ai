"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const Logo = (): JSX.Element => {
  const { t } = useTranslation(["vaccineTruth"]);

  return (
    <Link
      data-testid="app-logo"
      href={"/chat"}
      className="flex items-center gap-1"
    >
      <Image
        className="rounded-full"
        src={"/vt-logo.png"}
        alt="Vaccinetruth Logo"
        width={32}
        height={32}
      />
      <h1 className="text-sm text-vt-700 hover:text-vt-900  dark:text-vt-700 dark:hover:text-vt-900">
        {t("vaccineTruthAi")}
      </h1>
    </Link>
  );
};
