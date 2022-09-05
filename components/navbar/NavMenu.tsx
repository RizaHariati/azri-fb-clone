import { faAdd, faBell, faListDots } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { handleOpenMenu } from "../../app/store/post";
import { closeCommentSection } from "../../app/store/tool";
import { FriendType, OpenMenuType } from "../../typing.d";
import IconBtn from "../Buttons/IconBtn";
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

  if (mainProfile.picture && mainProfile.picture !== "") {
    return (
      <div className="nav-menu-container">
        <div className="nav-menu ">
          {mainProfile && (
            <>
              <div className="relative h-14 items-center flex xl:hidden">
                <IconBtn
                  icon={faAdd}
                  text="Create"
                  onClick={() => {
                    dispatch(handleOpenMenu("Create"));
                  }}
                  btnClass="icon-btn w-8 h-8 sm:w-10 sm:h-10"
                />
                {openMenu?.menuTitle === "Create" && <CreateMenu />}
              </div>

              <div className="relative h-14 items-center  hidden xl:flex">
                <IconBtn
                  icon={faListDots}
                  text="Menu"
                  onClick={() => {
                    dispatch(handleOpenMenu("Main"));
                  }}
                  btnClass="icon-btn w-8 h-8 sm:w-10 sm:h-10"
                />
                {openMenu?.menuTitle === "Main" && <MainMenu />}
              </div>

              <div className="relative h-14 items-center flex">
                <IconBtn
                  icon={faBell}
                  text="Notification"
                  onClick={() => {
                    dispatch(handleOpenMenu("Notification"));
                    dispatch(closeCommentSection());
                  }}
                  btnClass="icon-btn w-8 h-8 sm:w-10 sm:h-10"
                />
                {openMenu?.menuTitle === "Notification" && <NotificationMenu />}
              </div>
            </>
          )}

          <div className="relative h-fit items-center flex">
            {mainProfile?.picture !== "" && (
              <button
                onClick={() => dispatch(handleOpenMenu("Profile"))}
                className="img-icon"
              >
                <Image
                  src={mainProfile?.picture}
                  width={50}
                  height={50}
                  layout="responsive"
                  className="img-base rounded-full"
                  alt={mainProfile?.firstName}
                />
                <p className="icon-note">{"Your Profile"}</p>{" "}
              </button>
            )}

            {openMenu?.menuTitle === "Profile" && <ProfileMenu />}
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default NavMenu;
