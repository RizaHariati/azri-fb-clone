import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { openPostModal } from "../../app/store/tool";
import LinkImgBtn from "../Buttons/LinkImgBtn";
import PostingFormImage from "./PostingFormImage";

const PostingForm = () => {
  const { mainProfile } = useAppSelector((state) => state.friend);
  const dispatch = useAppDispatch();

  return (
    <div className=" bg-primaryMedium p-3 md:px-5 max-w-lg mx-auto shadow-sm shadow-black rounded-md md:mt-6 bgpin">
      {/* ------------------------- posting form ------------------------- */}
      <div className="flex justify-center gap-2 md:gap-3 text-center h-10">
        {mainProfile && (
          <LinkImgBtn
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
          onClick={() => dispatch(openPostModal("Create"))}
          className="height-10 text-textDark hover:text-textMedium text-left bg-primaryMediumLight hover:bg-primaryMediumLight transition-all px-3 rounded-full w-full text-sm md:text-base"
        >
          {`  What's on your mind, ${mainProfile?.firstName} ${mainProfile?.lastName} `}
        </button>
      </div>
      <hr className="col-span-9 my-3 border-b border-secondaryMedium" />
      {/* ------------------------ posting buttons ----------------------- */}

      <PostingFormImage />
    </div>
  );
};

export default PostingForm;
