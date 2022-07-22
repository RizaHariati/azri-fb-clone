import { faTimes } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { closePostModal } from "../../../app/store/tool";
import IconButton from "../../Buttons/IconButton";
import LinkImgTextButton from "../../Buttons/LinkImgTextButton";

const ModalPost = () => {
  const dispatch = useAppDispatch();
  const { mainProfile } = useAppSelector((state) => state.friend);
  return (
    <div className="modal-base ">
      <div className="modal-container">
        <div className="absolute right-5 top-5">
          <IconButton
            icon={faTimes}
            text="Close"
            onClick={() => {
              dispatch(closePostModal());
            }}
          />
        </div>
        <div>
          <h2 className="text-textLight text-xl font-bold w-full text-center">
            Create post
          </h2>
          <hr className="w-full my-5 border-b border-primaryMedium" />
          <div className="grid  grid-cols-2">
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
                onClick={() => dispatch(closePostModal())}
              />
            )}
          </div>
          <form className="w-full ">
            <textarea
              rows={6}
              placeholder={`what's on your mind,  ${mainProfile.firstName} ?`}
              className="text-area-modal"
            />
            <button className=" bg-accentMain h-10 text-textLight flex  hover:bg-accentDark rounded-md transition-all relative  justify-center items-center  text-sm font-medium gap-2 p-3 mb-0  text-center w-full">
              <p>Post</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalPost;
