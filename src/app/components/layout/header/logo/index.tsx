"use client";

import { getImagePath } from "@/lib/utils/imagePath";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 sm:gap-3"
      aria-label="Fixforge-dApps home"
    >
      <Image
        src={getImagePath("/images/logo/logo.png")}
        alt=""
        width={40}
        height={40}
        className="h-9 w-9 shrink-0 sm:h-10 sm:w-10"
        quality={100}
      />
      <span className="text-lg font-semibold tracking-tight text-white sm:text-xl">
        Fixforge-dApps
      </span>
    </Link>
  );
};

export default Logo;
