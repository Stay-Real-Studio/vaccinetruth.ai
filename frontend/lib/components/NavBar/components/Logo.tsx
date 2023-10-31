import Image from "next/image";
import Link from "next/link";

export const Logo = (): JSX.Element => {
  return (
    <Link
      data-testid="app-logo"
      href={"/chat"}
      className="flex items-center gap-4"
    >
      <Image
        className="rounded-full"
        src={"/logo.png"}
        alt="VaccineTruth.AI"
        width={48}
        height={48}
      />
      <h1 className="font-bold">VaccineTruth.AI</h1>
    </Link>
  );
};