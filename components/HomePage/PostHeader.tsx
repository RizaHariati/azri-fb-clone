import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faCircle,
  faEllipsis,
  faGlobeAsia,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { togglePostDetail } from "../../app/store/tool";
import { FriendType } from "../../typing.d";
import IconRoundTextButton from "../Buttons/IconRoundTextButton";
import LinkImgButton from "../Buttons/LinkImgButton";

interface HeaderProps {
  owner: FriendType;
  published: string;
  postID: string;
}
const PostHeader = ({ owner, published, postID }: HeaderProps) => {
  const mainProfile: FriendType = useAppSelector(
    (state) => state.friend.mainProfile
  );
  const { postDetail } = useAppSelector((state) => state.tool);

  const dispatch = useAppDispatch();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const date = moment(published).format("LL");
  return (
    <div className="grid grid-cols-9 gap-2 px-5 ">
      <LinkImgButton
        src={owner.picture}
        href="/profile"
        imgClass="img-icon m-0 p-0"
      />

      <div className=" col-span-7 text-textMedium text-sm font-medium cursor-pointer hover:underline-offset-2 underline-offset-auto ">
        <h4>{`${owner.firstName} ${owner.lastName}`}</h4>
        <p className="flex gap-2 items-center text-textDark text-xs">
          {date}
          <FontAwesomeIcon icon={faCircle} style={{ fontSize: "3px" }} />
          <FontAwesomeIcon icon={faGlobeAsia} className="text-xs" />
        </p>
      </div>
      {mainProfile?.id === owner.id && (
        <div className="relative">
          <button
            onClick={() => {
              console.log(postDetail === postID);
              dispatch(togglePostDetail(postID));
            }}
            className="icon-btn bg-primaryMediumDark hover:bg-primaryMedium"
          >
            <FontAwesomeIcon icon={faEllipsis} className="text-xl" />
          </button>
          {postDetail === postID && (
            <div className="absolute w-52 h-32 bg-primaryMedium rounded-md right-0 z-10 p-3">
              <IconRoundTextButton text="Delete Post" icon={faTrashAlt} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default PostHeader;
