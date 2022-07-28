import {
  faBars,
  faHome,
  faPeopleGroup,
  faPuzzlePiece,
  faStore,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import ExtIconSquareBtn from "../Buttons/ExtIconSquareBtn";
import IconSquareBtn from "../Buttons/IconSquareBtn";

const NavLinks = () => {
  return (
    <div className="nav-links-container ">
      <div className="nav-links">
        <div className=" col-span-1 md:col-span-3 h-full grid items-center w-full grid-cols-1 md:grid-cols-4">
          <IconSquareBtn
            icon={faHome}
            text="Home"
            href="/main/home/"
            iconClass="text-lg md:text-xl"
            hideClass=" w-12 sm:w-14 md:w-24 mx-auto "
          />
          <ExtIconSquareBtn
            href="https://www.facebook.com/watch/?ref=tab"
            icon={faTv}
            text="Watch"
            iconClass="text-lg md:text-xl"
            hideClass="hidden md:flex"
          />
          <ExtIconSquareBtn
            href="https://www.facebook.com/login/?next=%2Fmarketplace%2F"
            icon={faStore}
            text="Marketplace"
            iconClass="text-lg md:text-xl"
            hideClass="hidden md:flex"
          />
          <ExtIconSquareBtn
            href="https://www.facebook.com/groups/feed/"
            icon={faPeopleGroup}
            text="Groups"
            iconClass="text-lg md:text-xl"
            hideClass="hidden md:flex"
          />
        </div>
        <div className="col-span-1 sm:col-span-3 md:col-span-1 h-full grid items-center w-full">
          <ExtIconSquareBtn
            href="https://www.facebook.com/gaming/feed/"
            icon={faPuzzlePiece}
            text="Gaming"
            iconClass="text-lg md:text-xl"
            hideClass="hidden xl:flex w-28 "
          />
          <IconSquareBtn
            icon={faBars}
            text="More"
            href="/main/bookmarks/"
            iconClass="text-xl md:text-2xl"
            hideClass="xl:hidden w-12 sm:w-14 md:w-24  "
          />
        </div>
      </div>
    </div>
  );
};

export default NavLinks;
