import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowLeft,
  faChevronRight,
  faCircleQuestion,
  faExclamationTriangle,
  faGear,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

import { useAppSelector } from "../../../app/hooks";
import { settingData, supportData } from "../../../data/navbar-menu-data";
import IconBtn from "../../Buttons/IconBtn";
import IconTextBtn from "../../Buttons/IconTextBtn";
import LinkImgTextBtn from "../../Buttons/LinkImgTextBtn";

const ProfileMenu = () => {
  const { mainProfile } = useAppSelector((state) => state.friend);
  const [openSide, setOpenSide] = useState<{
    status: boolean;
    sidemenu: string;
  }>({ status: false, sidemenu: "" });

  const handleOpenSide = (menu: string) => {
    if (openSide.sidemenu === menu) {
      setOpenSide({ status: false, sidemenu: "" });
    } else {
      setOpenSide({ status: true, sidemenu: menu });
    }
  };

  const handleLogout = async () => {
    console.log("logging out");
  };
  return (
    <div className="profile-menu   ">
      <div
        className={`h-fit w-full p-2 sm:p-5 relative  ${
          openSide.sidemenu === "support" && "h-60 "
        }  ${openSide.sidemenu === "setting" && "h-96"} overflow-hidden`}
      >
        <Setting openSide={openSide} handleOpenSide={handleOpenSide} />
        <Support openSide={openSide} handleOpenSide={handleOpenSide} />
        <div>
          <LinkImgTextBtn
            href="/profile"
            src={
              mainProfile.picture
                ? mainProfile.picture
                : "/images/profile/profile.png"
            }
            text={mainProfile?.firstName + " " + mainProfile?.lastName}
            icon="img-icon"
            buttonClass="icon-round-text-btn-lg"
          />
          <hr className="w-full my-3 border-b border-primaryMedium" />
          <button
            className="icon-round-text-btn-lg h-12 group justify-between"
            onClick={() => handleOpenSide("setting")}
          >
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faGear}
                className="h-11 w-4 p-2 bg-primaryMedium group-hover:bg-primaryMediumLight rounded-full"
              />
              <p className="font-normal text-sm tracking-wide text-textLight">
                Setting & Privacy
              </p>
            </div>
            <FontAwesomeIcon
              icon={faChevronRight}
              className="h-11 w-4 p-2 text-xl"
            />
          </button>

          <button
            className="icon-round-text-btn-lg h-12 group justify-between"
            onClick={() => handleOpenSide("support")}
          >
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faCircleQuestion}
                className="h-11 w-4 p-2 bg-primaryMedium group-hover:bg-primaryMediumLight rounded-full"
              />
              <p className="font-normal text-sm tracking-wide text-textLight">
                Help & Support
              </p>
            </div>
            <FontAwesomeIcon
              icon={faChevronRight}
              className="h-11 w-4 p-2 text-xl"
            />
          </button>

          <button
            className="icon-round-text-btn-lg h-12 group justify-between"
            onClick={() => handleOpenSide("feedback")}
          >
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                className="h-11 w-4 p-2 bg-primaryMedium group-hover:bg-primaryMediumLight rounded-full"
              />
              <p className="font-normal text-sm tracking-wide text-textLight">
                Help & Support
              </p>
            </div>
          </button>

          <button
            className="icon-round-text-btn-lg h-12 group justify-between"
            onClick={() => handleLogout()}
          >
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faSignOut}
                className="h-11 w-4 p-2 bg-primaryMedium group-hover:bg-primaryMediumLight rounded-full"
              />
              <p className="font-normal text-sm tracking-wide text-textLight">
                Logout
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;

interface SettingProps {
  openSide: {
    status: boolean;
    sidemenu: string;
  };
  handleOpenSide: (menu: string) => void;
}

const Setting = ({ openSide, handleOpenSide }: SettingProps) => {
  return (
    <div
      className={`absolute w-full h-fit bg-primaryMediumDark z-30 transition-all rounded-md p-2 sm:p-5 ${
        openSide.status && openSide.sidemenu === "setting"
          ? "left-0 top-0 "
          : "left-full top-0"
      }`}
    >
      <div className="flex gap-3 items-center">
        <IconBtn
          icon={faArrowLeft}
          text="Create"
          btnClass="icon-btn "
          onClick={() => handleOpenSide("setting")}
        />
        <p>Setting & Privacy</p>
      </div>
      <hr className="w-full my-3 border-b border-primaryMedium" />
      <div>
        {settingData.map(
          (data: { text: string; icon: IconProp }, index: number) => {
            return (
              <IconTextBtn key={index} text={data.text} icon={data.icon} />
            );
          }
        )}
      </div>
    </div>
  );
};

const Support = ({ openSide, handleOpenSide }: SettingProps) => {
  return (
    <div
      className={`absolute w-full h-60 bg-primaryMediumDark z-20 transition-all rounded-md p-2 sm:p-5  ${
        openSide.status && openSide.sidemenu === "support"
          ? "left-0 top-0 "
          : "left-full top-0"
      }`}
    >
      <div className="flex gap-3 items-center">
        <IconBtn
          icon={faArrowLeft}
          text="Create"
          btnClass="icon-btn "
          onClick={() => handleOpenSide("support")}
        />
        <p>Setting & Privacy</p>
      </div>
      <hr className="w-full my-3 border-b border-primaryMedium" />
      <div>
        {supportData.map(
          (data: { text: string; icon: IconProp }, index: number) => {
            return (
              <IconTextBtn key={index} text={data.text} icon={data.icon} />
            );
          }
        )}
      </div>
    </div>
  );
};
