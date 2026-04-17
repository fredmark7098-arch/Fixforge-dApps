"use client";

import { getImagePath } from "@/lib/utils/imagePath";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center" aria-label="Fixforge-dApps home">
      <Image
        src={getImagePath("/images/logo/logo.png")}
        alt="Fixforge-dApps"
        width={220}
        height={50}
        style={{ width: "auto", height: "auto" }}
        quality={100}
      />
    </Link>
  );
};

export default Logo;
