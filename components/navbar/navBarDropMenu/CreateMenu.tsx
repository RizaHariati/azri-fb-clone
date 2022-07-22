import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { mainMenuRight } from "../../../data/main-menu-data";

const CreateMenu = () => {
  return (
    <div className="create-menu ">
      <h3 className=" text-textLight text-xl font-semibold px-5 pt-5 ">
        Create
      </h3>
      <hr className="w-full my-3 border-b border-primaryMedium" />
      <div className="notifications-container">
        {mainMenuRight.map((menu, index: number) => {
          return (
            <div
              key={index}
              className="grid grid-cols-7 align-top  transition-all hover:bg-primaryMedium p-2 rounded-md cursor-pointer w-full"
            >
              <FontAwesomeIcon icon={menu.icon} />
              <div className=" col-span-6">
                <h4>{menu.name}</h4>
                <p className="text-xs text-textDark">{menu.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CreateMenu;
