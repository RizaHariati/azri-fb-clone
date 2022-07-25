import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faImage, faLaugh } from "@fortawesome/free-regular-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setImagePost } from "../../app/store/post";
import { openPostModal } from "../../app/store/tool";

const PostingFormImage = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-2 text-center h-10 w-full">
        <PostingButton
          icon={faVideo}
          buttonText="Live video"
          color="text-red-500"
        />
        <PostingButton
          icon={faImage}
          buttonText="Photo/Video"
          color="text-green-500"
        />
        <PostingButton
          icon={faLaugh}
          buttonText="Feeling/Activity"
          color="text-yellow-500"
        />
      </div>
      <p className="text-xs text-textDark w-full text-center">
        your image won't really be uploaded for security reasons.
      </p>
    </div>
  );
};

export default PostingFormImage;

interface Props {
  icon: IconProp;
  buttonText: string;
  color: string;
}

const PostingButton = ({ icon, buttonText, color }: Props) => {
  const dispatch = useAppDispatch();
  const { postModal } = useAppSelector((state) => state.tool);

  const getImageUrl = async (e: any) => {
    e.preventDefault();
    if (!postModal) {
      dispatch(openPostModal());
    }
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      dispatch(setImagePost(readerEvent.target?.result?.toString()));
    };
  };
  return (
    <label className="icon-btn-square w-full h-9  text-xs font-medium gap-2 cursor-pointer">
      <input
        type="file"
        className="hidden"
        accept="image/png, image/jpg, image/jpeg"
        onChange={(e) => {
          getImageUrl(e);
        }}
        id="imagePost"
        name="imagePost"
      />
      <FontAwesomeIcon icon={icon} className={`text-xl ${color}`} />
      {buttonText}
    </label>
  );
};
