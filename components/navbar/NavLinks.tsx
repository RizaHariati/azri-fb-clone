import {
  faBars,
  faHome,
  faPeopleGroup,
  faPuzzlePiece,
  faStore,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { handleOpenMenu } from "../../app/store/post";
import ExtIconSquareButton from "../Buttons/ExtIconSquareButton";
import IconSquareButton from "../Buttons/IconSquareButton";

const NavLinks = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="nav-links-container">
      <div className="nav-links">
        <div className="hidden col-span-4 sm:grid sm:grid-cols-4  items-center justify-between mr-auto w-fit sm:w-full">
          <IconSquareButton
            icon={faHome}
            text="Home"
            href="/main/home/"
            iconClass="text-xl"
          />
          <ExtIconSquareButton
            href="https://www.facebook.com/watch/?ref=tab"
            icon={faTv}
            text="Watch"
            iconClass="text-xl"
          />
          <ExtIconSquareButton
            href="https://www.facebook.com/login/?next=%2Fmarketplace%2F"
            icon={faStore}
            text="Marketplace"
            iconClass="text-xl"
          />
          <ExtIconSquareButton
            href="https://www.facebook.com/groups/feed/"
            icon={faPeopleGroup}
            text="Groups"
            iconClass="text-xl"
          />
        </div>
        <ExtIconSquareButton
          href="https://www.facebook.com/gaming/feed/"
          icon={faPuzzlePiece}
          text="Gaming"
          iconClass="text-xl"
          hideClass="hidden xl:block w-28 "
        />
        <IconSquareButton
          icon={faBars}
          text="More"
          href="/main/bookmarks/"
          iconClass="text-3xl"
          hideClass="xl:hidden w-12 sm:w-14 md:w-24 "
        />
      </div>
    </div>
  );
};

export default NavLinks;
