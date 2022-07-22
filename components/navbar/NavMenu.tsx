import {
  faAdd,
  faBell,
  faListDots,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { handleOpenMenu } from "../../app/store/post";
import { FriendType, OpenMenuType } from "../../typing.d";

import IconButton from "../Buttons/IconButton";
import ImgButton from "../Buttons/ImgButton";
import CreateMenu from "./navBarDropMenu/CreateMenu";
import MainMenu from "./navBarDropMenu/MainMenu";
import NotificationMenu from "./navBarDropMenu/NotificationMenu";
import ProfileMenu from "./navBarDropMenu/ProfileMenu";

const NavMenu = () => {
  const dispatch = useAppDispatch();
  const mainProfile: FriendType = useAppSelector(
    (state) => state.friend.mainProfile
  );
  const openMenu: OpenMenuType = useAppSelector((state) => state.post.openMenu);

  if (mainProfile?.picture !== "") {
    return (
      <div className="nav-menu-container">
        <div className="nav-menu ">
          {mainProfile && (
            <>
              <div className="relative h-14 items-center flex xl:hidden">
                <IconButton
                  icon={faAdd}
                  text="Create"
                  btnClass="icon-btn "
                  onClick={() => {
                    dispatch(handleOpenMenu("Create"));
                  }}
                />
                {openMenu?.menuTitle === "Create" && <CreateMenu />}
              </div>

              <div className="relative h-14 items-center  hidden xl:flex">
                <IconButton
                  icon={faListDots}
                  text="Menu"
                  btnClass="icon-btn"
                  onClick={() => {
                    dispatch(handleOpenMenu("Main"));
                  }}
                />
                {openMenu?.menuTitle === "Main" && <MainMenu />}
              </div>

              <div className="relative h-14 items-center flex">
                <IconButton
                  icon={faBell}
                  text="Notification"
                  onClick={() => {
                    dispatch(handleOpenMenu("Notification"));
                  }}
                />
                {openMenu.menuTitle === "Notification" && <NotificationMenu />}
              </div>
            </>
          )}

          <button
            className="relative h-fit items-center flex"
            onClick={() => dispatch(handleOpenMenu("Profile"))}
          >
            {mainProfile?.picture !== "" && (
              <ImgButton
                src={mainProfile?.picture}
                text={"Your Profile"}
                imgClass="img-icon"
              />
            )}

            {openMenu.menuTitle === "Profile" && <ProfileMenu />}
          </button>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default NavMenu;
