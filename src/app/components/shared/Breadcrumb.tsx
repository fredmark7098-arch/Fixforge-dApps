import Link from "next/link";
import { BreadcrumbProps } from "../../types/breadcrumb"; // Adjust the import path based on your project structure

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  pageName,
  pageDescription,
}) => {
  return (
    <div className="relative z-10 overflow-hidden bg-darkmode pb-[60px] pt-[120px] md:pt-[130px] lg:pt-[160px]">
      <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-white/15 to-transparent"></div>
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4">
            <div className="text-center">
              <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-[40px] md:leading-[1.2]">
                {pageName}
              </h1>
              <p className="mb-5 text-base text-white/60">
                {pageDescription}
              </p>

              <ul className="flex items-center justify-center gap-[10px]">
                <li>
                  <Link
                    href="/"
                    className="flex items-center gap-[10px] text-base font-medium text-white/55 hover:text-amber-300"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <p className="flex items-center gap-[10px] text-base font-medium text-white/70">
                    <span className="text-white/40"> / </span>
                    {pageName}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
