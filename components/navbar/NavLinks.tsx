import {
  faBars,
  faHome,
  faPeopleGroup,
  faPuzzlePiece,
  faStore,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { closeNavbarMenu } from "../../app/store/post";
import ExtIconSquareBtn from "../Buttons/ExtIconSquareBtn";
import IconSquareBtn from "../Buttons/IconSquareBtn";

const NavLinks = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();

  const handleClose = (path: string) => {
    route.push(path);
    dispatch(closeNavbarMenu());
  };
  return (
    <div className="nav-links-container ">
      <div className="nav-links">
        <div className=" col-span-1 md:col-span-3 h-full grid items-center w-full grid-cols-1 md:grid-cols-4">
          <button
            onClick={() => handleClose("/main/home/")}
            className="icon-btn-square  w-12 sm:w-14 md:w-24 mx-auto "
          >
            <FontAwesomeIcon icon={faHome} className="text-lg md:text-xl" />
            <p className="icon-note">Home</p>
          </button>

          <ExtIconSquareBtn
            href="https://www.facebook.com/climatescienceinfo/"
            icon={faTv}
            text="Watch"
            iconClass="text-lg md:text-xl"
            hideClass="hidden md:flex"
          />
          <ExtIconSquareBtn
            href="https://www.facebook.com/coronavirus_info/"
            icon={faStore}
            text="Marketplace"
            iconClass="text-lg md:text-xl"
            hideClass="hidden md:flex"
          />
          <ExtIconSquareBtn
            href="https://www.facebook.com/fundraisers/"
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
          <button
            onClick={() => handleClose("/main/bookmarks/")}
            className="icon-btn-square xl:hidden w-12 sm:w-14 md:w-24  "
          >
            <FontAwesomeIcon icon={faBars} className="text-xl md:text-2xl" />
            <p className="icon-note">More</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavLinks;
