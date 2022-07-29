import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { useAppDispatch } from "../../../app/hooks";
import { closeNavbarMenu } from "../../../app/store/post";
import { openPostModal } from "../../../app/store/tool";
import { mainMenuLeft, mainMenuRight } from "../../../data/main-menu-data";
import IconRoundTextBtn from "../../Buttons/IconRoundTextBtn";

type MenuRight = {
  name: string;
  icon: IconProp;
  href?: string;
  a?: string;
};
export type LinkLeft = {
  link: string;
  icon: IconProp;
  text: string;
  color: string;
  href?: string;
  a?: string;
};

export type MainMenuLeft = {
  id: string;
  title: string;
  links: LinkLeft[];
};

const MainMenu = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={`main-menu`}>
      <h3 className=" text-textLight text-xl font-semibold py-5 px-2 sm:px-5">
        Menu
      </h3>
      <div className="grid grid-cols-5 h-full w-full gap-3 px-3">
        <div className="main-menu-left">
          {mainMenuLeft.map((main: MainMenuLeft) => {
            return (
              <div key={main.id}>
                <h3 className="text-textLight text-lg font-semibold mb-2 capitalize w-full border-b border-primaryMediumLight">
                  {main.title}
                </h3>
                <div className="w-full ">
                  {main.links.map((linkMenu: LinkLeft, index: number) => {
                    if (linkMenu.href) {
                      return (
                        <Link href={linkMenu.href} key={index}>
                          <div className=" grid grid-cols-7 align-top  transition-all hover:bg-primaryMedium p-2 rounded-md cursor-pointer">
                            <MenuLink linkMenu={linkMenu} />
                          </div>
                        </Link>
                      );
                    } else if (linkMenu.a) {
                      return (
                        <a
                          key={index}
                          href={linkMenu.a}
                          className=" grid grid-cols-7 align-top  transition-all hover:bg-primaryMedium p-2 rounded-md cursor-pointer"
                        >
                          <MenuLink linkMenu={linkMenu} />
                        </a>
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="main-menu-right p-2">
          <h3 className="text-textLight text-xl font-semibold pb-2 px-2 sm:px-5">
            Create
          </h3>
          {mainMenuRight.map((menu: MenuRight, index: number) => {
            if (menu.a) {
              return (
                <a href={menu.a} key={index}>
                  <IconRoundTextBtn
                    key={index}
                    text={menu.name}
                    icon={menu.icon}
                  />
                </a>
              );
            }
            if (menu.href) {
              if (menu.href === "/main/pages") {
                return (
                  <Link href={menu.href} key={index}>
                    <button className="icon-round-text-btn text-textMedium h-12 hover:bg-primaryMedium group border-b border-primaryMedium ">
                      <div className="h-10 w-10 bg-primaryMedium rounded-full flex items-center justify-center group-hover:bg-primaryMediumLight">
                        <FontAwesomeIcon icon={menu.icon} className="text-lg" />
                      </div>
                      <p className="text-textMedium font-normal text-sm">
                        {menu.name}
                      </p>
                    </button>
                  </Link>
                );
              } else {
                return (
                  <IconRoundTextBtn
                    onClick={() => {
                      dispatch(closeNavbarMenu());
                      dispatch(openPostModal("Create"));
                    }}
                    key={index}
                    text={menu.name}
                    icon={menu.icon}
                  />
                );
              }
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default MainMenu;

interface LinkProps {
  linkMenu: LinkLeft;
}
const MenuLink = ({ linkMenu }: LinkProps) => {
  return (
    <>
      <div className=" col-span-1 py-1">
        <FontAwesomeIcon
          icon={linkMenu.icon}
          className={`text-xl ${linkMenu.color}`}
        />
      </div>
      <div className=" col-span-6">
        <h4>{linkMenu.link}</h4>
        <p className="text-xs text-textDark">{linkMenu.text}</p>
      </div>
    </>
  );
};
