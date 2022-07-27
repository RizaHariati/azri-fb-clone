import Image from "next/image";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import LinkImgTextBtn from "../Buttons/LinkImgTextBtn";
import Contacts from "./Contacts";

const MainRightSidebar = () => {
  return (
    <div className="main-right-sidebar ">
      {/* --------------------------- Sponsored -------------------------- */}
      <Sponsor />
      <hr className="w-full my-3 border-b border-primaryMedium" />
      {/* -------------------- Your Pages And Profiles ------------------- */}
      <PagesProfile />
      <hr className="w-full my-3 border-b border-primaryMedium" />
      {/* --------------------------- Contacts --------------------------- */}
      <Contacts />
    </div>
  );
};

export default MainRightSidebar;

const Sponsor = () => {
  return (
    <div className="mt-5 flex flex-col gap-5 w-full bg ">
      <h4 className=" text-textDark font-semibold">Sponsored</h4>
      <button className="grid grid-cols-5 gap-2 items-center w-full hover:bg-primaryMediumDark rounded-md p-2">
        <div className="sponsor-img">
          <Image
            width={150}
            height={150}
            src="https://source.unsplash.com/random/200x200/?Yoga"
            alt="yoga"
            className="img-base"
          />
        </div>
        <div className=" col-span-3">
          <h5 className=" text-textLight">YOGA BODY</h5>
          <p className="text-xs text-textDark">yogabody.com</p>
        </div>
      </button>
      <button className="grid grid-cols-5 gap-2 items-center w-full hover:bg-primaryMediumDark rounded-md p-2">
        <div className="sponsor-img">
          <Image
            width={150}
            height={150}
            src="https://source.unsplash.com/random/200x200/?Mango"
            alt="yoga"
            className="img-base"
          />
        </div>
        <div className=" col-span-3">
          <h5 className=" text-textLight">
            Get in touch with your experts today
          </h5>
          <p className="text-xs text-textDark">mangodb.com</p>
        </div>
      </button>
    </div>
  );
};

const PagesProfile = () => {
  return (
    <div>
      <h4 className=" text-textDark font-semibold">Your Pages and profiles</h4>
      <div>
        <LinkImgTextBtn
          href="/profile"
          src="/images/profile/profile.jpg"
          text="Riza Hariati"
        />
      </div>
    </div>
  );
};
