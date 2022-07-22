import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { mainLeftLinks, mainShortcuts } from "../../data/main-data";
import ExtLinkTextButton from "../Buttons/ExtLinkTextButton";
import LinkIconTextButton from "../Buttons/LinkIconTextButton";
import LinkImgTextButton from "../Buttons/LinkImgTextButton";

type IconTextBtn = {
  name: string;
  icon: IconProp;
  href: string;
  color: string;
};

type ShortcutType = {
  id: string;
  name: string;
  url: string;
  link: string;
};
interface Props {
  leftClass: string;
}

const MainLeftSidebar = ({ leftClass }: Props) => {
  const [openMenuList, setOpenMenuList] = useState<boolean>(false);
  const { mainProfile } = useAppSelector((state) => state.friend);
  return (
    <div className={leftClass}>
      {/* ------------------------- main profile ------------------------- */}
      {mainProfile?.id !== "" && (
        <LinkImgTextButton
          href="/profile"
          src={
            mainProfile?.picture
              ? mainProfile.picture
              : "/images/profile/profile.png"
          }
          text={mainProfile.firstName + " " + mainProfile.lastName}
          icon=""
        />
      )}

      {/* ---------------------- main menu shortcuts --------------------- */}
      <div
        className={
          openMenuList ? "h-fit overflow-hidden" : "h-72 overflow-hidden"
        }
      >
        {mainLeftLinks.map((link: IconTextBtn, index: number) => {
          return (
            <LinkIconTextButton
              key={index}
              href={link.href}
              text={link.name}
              icon={link.icon}
              color={link.color}
            />
          );
        })}
      </div>
      <button
        className="icon-round-text-btn group"
        onClick={() => setOpenMenuList(!openMenuList)}
      >
        <FontAwesomeIcon
          icon={openMenuList ? faChevronUp : faChevronDown}
          className="h-11 w-4 p-2 bg-primaryMedium group-hover:bg-primaryMediumLight rounded-full"
        />
        <p className="font-semibold">
          {openMenuList ? "See less" : "See more"}
        </p>
      </button>
      <hr className="w-full my-3 border-b border-primaryMedium" />
      {/* ----------------------- custom shortcuts ----------------------- */}
      <div>
        <h4 className="text-base text-textDark">Your shorcuts</h4>
        {mainShortcuts.map((shortcut: ShortcutType) => {
          return (
            <ExtLinkTextButton
              key={shortcut.id}
              href={shortcut.link}
              text={shortcut.name}
              src={shortcut.url}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MainLeftSidebar;
