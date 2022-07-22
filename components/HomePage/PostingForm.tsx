import { faImages, faLaugh, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { openPostModal } from "../../app/store/tool";
import LinkImgButton from "../Buttons/LinkImgButton";

const PostingForm = () => {
  const { mainProfile } = useAppSelector((state) => state.friend);
  const dispatch = useAppDispatch();
  return (
    <div className=" bg-primaryMediumDark p-3 px-5 max-w-lg mx-auto shadow-sm shadow-black rounded-md md:mt-6">
      {/* ------------------------- posting form ------------------------- */}
      <div className="grid grid-cols-10 justify-center gap-3 text-center h-10 ">
        {mainProfile && (
          <LinkImgButton
            src={
              mainProfile?.picture
                ? mainProfile.picture
                : "/images/profile/profile.png"
            }
            href="/profile"
            imgClass="img-icon"
          />
        )}

        <button
          onClick={() => dispatch(openPostModal())}
          className="height-10 text-textDark hover:text-textMedium col-span-9 text-left bg-primaryMedium hover:bg-primaryMediumLight transition-all px-3 rounded-full"
        >
          {`  What's on your mind, ${mainProfile?.firstName} ${mainProfile?.lastName} `}
        </button>
      </div>
      <hr className="col-span-9 my-3 border-b border-primaryMedium" />
      {/* ------------------------ posting buttons ----------------------- */}
      <div className="flex items-center justify-center gap-2 text-center h-10">
        <button className="icon-btn-square w-full text-sm font-medium gap-2">
          <FontAwesomeIcon icon={faVideo} className="text-2xl text-red-500" />
          Live video
        </button>
        <button className="icon-btn-square w-full text-sm font-medium gap-2">
          <FontAwesomeIcon
            icon={faImages}
            className="text-2xl text-green-500"
          />
          Photo/Video
        </button>
        <button className="icon-btn-square w-full text-sm font-medium gap-2">
          <FontAwesomeIcon
            icon={faLaugh}
            className="text-2xl text-yellow-500"
          />
          Feeling/Activity
        </button>
      </div>
    </div>
  );
};

export default PostingForm;
