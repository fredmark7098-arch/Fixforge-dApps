"use client";

import { Footerlinkdata, Sociallinkdata } from "@/lib/data/pageData";
import { getImagePath } from "@/lib/utils/imagePath";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative border-t border-amber-500/10 bg-body-bg pt-10">
      <div className="pointer-events-none absolute top-0 -left-1/4 hidden h-full w-[150%] bg-linear-to-r from-amber-600/25 via-orange-700/15 to-transparent blur-[120px] lg:block" />
      <div className="container relative z-10 pb-16">
        <div className="grid grid-cols-1 gap-y-10 md:gap-x-16 sm:grid-cols-2 lg:grid-cols-12 xl:gap-x-8">
          <div className="lg:col-span-6 sm:col-span-2">
            <img
              className="block h-12 w-20px mb-4"
              src={getImagePath("/images/logo/logo.png")}
              alt="Fixforge-dApps"
            />
            <p className="text-white/60 text-sm font-normal max-w-96 leading-7 mb-7">
              We highlight how decentralized systems spread trust across many
              nodes transparent rules, cryptographic proofs, and open
              participation instead of a single company controlling the ledger.
            </p>
            <div className="flex gap-4">
              {Sociallinkdata.map((items, i) => (
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  href={"#!"}
                  key={i}
                >
                  <img
                    src={items.imgsrc}
                    alt={items.imgsrc}
                    className="hover:opacity-70"
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="group relative lg:col-span-2">
            <p className="text-white text-xl font-medium mb-9">Useful Links</p>
            <ul>
              {Footerlinkdata.map((product, i) => (
                <li key={i} className="mb-5">
                  <Link
                    href={product.href}
                    className="text-white/60 text-sm font-normal mb-6 space-links hover:text-primary"
                  >
                    {product.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-4">
            <p className="text-white text-xl font-medium mb-9">Contact Us</p>
            <Link
              href={"tel:(406) 555-012"}
              className="text-white/60 hover:text-primary text-sm font-normal mb-6 flex gap-2 w-fit"
            >
              <Image
                src={getImagePath("/images/footer/number.svg")}
                alt="number-icon"
                width={20}
                height={20}
              />
              (406) 555-012
            </Link>
            <Link
              href={"mailto:tim.jennings@example.com"}
              className="text-white/60 hover:text-primary text-sm font-normal mb-6 flex gap-2 w-fit"
            >
              <Image
                src={getImagePath("/images/footer/email.svg")}
                alt="email-icon"
                width={20}
                height={20}
              />
              fredmark7098@gmail.com
            </Link>
            <div className="text-white/60 text-sm font-normal mb-6 flex gap-2">
              <Image
                src={getImagePath("/images/footer/address.svg")}
                alt="address-icon"
                width={20}
                height={20}
              />
              Elgin St. Celina, Downtown 10299
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-8">
        <p className="text-center text-white">
          © 2026 Fixforge-dApps. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
