import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { mainMenuLeft, mainMenuRight } from "../../../data/main-menu-data";
import IconRoundTextBtn from "../../Buttons/IconRoundTextBtn";

type MenuRight = {
  name: string;
  icon: IconProp;
};
export type LinkLeft = {
  link: string;
  icon: IconProp;
  text: string;
  color: string;
};

export type MainMenuLeft = {
  id: string;
  title: string;
  links: LinkLeft[];
};

const MainMenu = () => {
  return (
    <div className={`main-menu`}>
      <h3 className=" text-textLight text-xl font-semibold py-5 px-2 sm:px-5">
        Menu
      </h3>
      <div className="grid grid-cols-5 h-full w-full gap-3 px-3">
        <div className="main-menu-left">
          {mainMenuLeft.map((main) => {
            return (
              <div key={main.id}>
                <h3 className="text-textLight text-lg font-semibold mb-2 capitalize w-full border-b border-primaryMediumLight">
                  {main.title}
                </h3>
                <div className="w-full ">
                  {main.links.map((linkMenu: LinkLeft, index: number) => {
                    return (
                      <div
                        key={index}
                        className=" grid grid-cols-7 align-top  transition-all hover:bg-primaryMedium p-2 rounded-md cursor-pointer"
                      >
                        <div className=" col-span-1 py-1">
                          <FontAwesomeIcon
                            icon={linkMenu.icon}
                            className={`text-xl ${linkMenu.color}`}
                          />
                        </div>
                        <div className=" col-span-6">
                          <h4>{linkMenu.link}</h4>
                          <p className="text-xs text-textDark">
                            {linkMenu.text}
                          </p>
                        </div>
                      </div>
                    );
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
            if (index === 2) {
              return (
                <div
                  key={index}
                  className=" border-b border-primaryMediumLight pb-2"
                >
                  <IconRoundTextBtn
                    key={index}
                    text={menu.name}
                    icon={menu.icon}
                  />
                </div>
              );
            } else {
              return (
                <IconRoundTextBtn
                  key={index}
                  text={menu.name}
                  icon={menu.icon}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
