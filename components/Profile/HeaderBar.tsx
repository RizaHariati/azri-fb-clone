import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import { FullProfileType } from "../../typing.d";
import IconSquareButton from "../Buttons/IconSquareButton";
import LinkImgTextButton from "../Buttons/LinkImgTextButton";
import TextButton from "../Buttons/TextButton";

const headBarMenu = [
  { name: "Posts" },
  { name: "About" },
  { name: "Friends" },
  { name: "Photos" },
  { name: "Videos" },
  { name: "Check-ins" },
];
interface Props {
  fixHeaderBar: boolean;
  profile: FullProfileType;
}
const HeaderBar = ({ fixHeaderBar, profile }: Props) => {
  return (
    <div
      className=" header-bar absolute bottom-0 "
      // className={
      //   fixHeaderBar
      //     ? " header-bar absolute bottom-0 "
      //     : " header-bar fixed top-14"
      // }
    >
      <div className=" max-w-4xl mx-auto h-full grid grid-cols-9 px-2 md:px-5 lg:px-10 items-center border-t border-primaryMediumLight">
        <div className="relative col-span-8 h-full w-full">
          <div
            className={
              fixHeaderBar ? " w-9/12 header-bar-menu" : "w-0 header-bar-menu"
            }
          >
            <div className="flex-nowrap flex " style={{ width: "700px" }}>
              {headBarMenu.map((item, index: number) => {
                return <TextButton key={index} text={item.name} />;
              })}
            </div>
          </div>
          <div
            className={
              fixHeaderBar
                ? " w-0 header-bar-profile"
                : "w-7/12 header-bar-profile"
            }
          >
            <div className="w-96 ">
              {profile?.id !== "" && (
                <LinkImgTextButton
                  href="/profile"
                  src={
                    profile?.picture
                      ? profile.picture
                      : "/images/profile/profile.png"
                  }
                  text={profile.firstName + " " + profile.lastName}
                  icon=""
                  buttonClass="icon-round-text-btn-lg h-12"
                />
              )}
            </div>
          </div>
        </div>
        <div className="h-full ">
          <IconSquareButton
            hideClass="mt-1 bg-primaryMedium"
            href="/profile"
            icon={faEllipsis}
            text="menu"
            iconClass="text-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
