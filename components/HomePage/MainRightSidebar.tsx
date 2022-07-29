import Image from "next/image";
import React from "react";
import LinkImgTextBtn from "../Buttons/LinkImgTextBtn";
import Contacts from "./Contacts";
import Sponsor from "./Sponsor";

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

const PagesProfile = () => {
  return (
    <div>
      <h4 className=" text-textDark font-semibold">Your Pages and profiles</h4>

      <a href="https://www.linkedin.com/in/riza-hariati-2021/">
        <button className="icon-round-text-btn ">
          <div className="img-icon-small">
            <Image
              src="/images/profile/profile.jpg"
              width={30}
              height={30}
              layout="responsive"
              className="img-base rounded-full"
              alt="Riza Hariati"
            />
          </div>
          <p className="text-textMedium font-normal">Riza Hariati Page</p>
        </button>
      </a>
    </div>
  );
};
