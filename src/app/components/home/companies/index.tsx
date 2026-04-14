"use client";
import { Companiesdata } from "@/lib/data/pageData";
import Image from "next/image";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const Companies = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <section className="border-none -my-2 pt-0 overflow-x-clip">
      <div className="container min-w-0">
        <div className="min-h-[101px] min-w-0">
          {mounted ? (
            <Slider className="companies-slick" {...settings}>
              {Companiesdata?.map((item: any, i: any) => (
                <div key={i}>
                  <Image
                    src={item.imgSrc}
                    alt={item.imgSrc}
                    width={203}
                    height={101}
                    className="w-auto"
                  />
                </div>
              ))}
            </Slider>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Companies;
