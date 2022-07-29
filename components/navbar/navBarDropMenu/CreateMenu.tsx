import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { useAppDispatch } from "../../../app/hooks";
import { closeNavbarMenu } from "../../../app/store/post";
import { openPostModal } from "../../../app/store/tool";
import { mainMenuRight } from "../../../data/main-menu-data";

type CreateType = {
  name: string;
  icon: IconProp;
  text: string;
  href?: string;
  a?: string;
};
const CreateMenu = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="create-menu ">
      <h3 className=" text-textLight text-xl font-semibold px-5 pt-5 ">
        Create
      </h3>
      <hr className="w-full my-3 border-b border-primaryMedium" />
      <div className="notifications-container">
        {mainMenuRight.map((menu, index: number) => {
          if (menu.href) {
            if (menu.href === "/main/pages") {
              return (
                <Link href={menu.href} key={index}>
                  <div>
                    <Creating menu={menu} />
                  </div>
                </Link>
              );
            } else {
              return (
                <button
                  key={index}
                  className="w-full text-left"
                  onClick={() => {
                    dispatch(closeNavbarMenu());
                    dispatch(openPostModal("Create"));
                  }}
                >
                  <Creating menu={menu} />
                </button>
              );
            }
          }
          if (menu.a) {
            return (
              <a href={menu.a} key={index}>
                <Creating menu={menu} />
              </a>
            );
          }
        })}
      </div>
    </div>
  );
};

export default CreateMenu;

interface Props {
  menu: CreateType;
}

const Creating = ({ menu }: Props) => {
  return (
    <div className="grid grid-cols-7 align-top  transition-all hover:bg-primaryMedium p-2 rounded-md cursor-pointer w-full">
      <FontAwesomeIcon icon={menu.icon} />
      <div className=" col-span-6">
        <h4>{menu.name}</h4>
        <p className="text-xs text-textDark">{menu.text}</p>
      </div>
    </div>
  );
};

const Creating2 = ({ menu }: Props) => {
  return (
    <>
      <FontAwesomeIcon icon={menu.icon} />
      <div className=" col-span-6 text-left">
        <h4>{menu.name}</h4>
        <p className="text-xs text-textDark">{menu.text}</p>
      </div>
    </>
  );
};
