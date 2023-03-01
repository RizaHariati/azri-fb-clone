import Image from "next/image";
import React from "react";

const Sponsor = () => {
  return (
    <div className="mt-5 flex flex-col gap-5 w-full max-w-lg mx-auto ">
      <h4 className=" text-textDark font-semibold">Sponsored</h4>
      <a
        href="https://dompetdhuafa.org/"
        className="grid grid-cols-5 gap-2 items-center w-full hover:bg-primaryMediumLight transition-all rounded-md p-2 bg-primaryMedium"
      >
        <div className="sponsor-img bg-textLight w-16 md:w-18 h-16 md:h-18">
          <Image
            width={120}
            height={120}
            src="/images/pagesImages/dompet-dhuafa-365x365.png"
            alt="dhuafa"
            layout="responsive"
            className="img-base"
          />
        </div>
        <div className=" col-span-3 text-left">
          <h5 className=" text-textLight">Dompet Dhuafa</h5>
          <p className="text-xs text-textDark">dompetdhuafa.org</p>
        </div>
      </a>
      <a
        href="https://www.ichacodes.com/"
        className="grid grid-cols-5 gap-2 items-center w-full hover:bg-primaryMediumLight transition-all rounded-md p-2 bg-primaryMedium"
      >
        <div className="sponsor-img bg-textLight w-16 md:w-18 h-16 md:h-18">
          <Image
            width={120}
            height={120}
            layout="responsive"
            src="/images/pagesImages/icon.png"
            alt="azricoding"
            className="img-base"
          />
        </div>
        <div className=" col-span-3 text-left">
          <h5 className=" text-textLight ">IchaCodes website portfolio</h5>
          <p className="text-xs text-textDark">visit ichacodes.com</p>
        </div>
      </a>
      <a
        href="https://bayarplanner.com/"
        className="grid grid-cols-5 gap-2 items-center w-full hover:bg-primaryMediumLight transition-all rounded-md p-2 bg-primaryMedium"
      >
        <div className="sponsor-img bg-textLight w-16 md:w-18 h-16 md:h-18">
          <Image
            width={120}
            height={120}
            layout="responsive"
            src="/images/pagesImages/bayarplanner-logo.png"
            alt="azricoding"
            className="img-base"
          />
        </div>
        <div className=" col-span-3 text-left">
          <h5 className=" text-textLight ">BayarPlanner</h5>
          <p className="text-xs text-textDark">bayarplanner.com</p>
        </div>
      </a>
    </div>
  );
};

export default Sponsor;
