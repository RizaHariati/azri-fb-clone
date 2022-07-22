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
import { setPostDetail } from "../../app/store/tool";
import { FriendType } from "../../typing.d";
import IconRoundTextButton from "../Buttons/IconRoundTextBtn";
import LinkImgButton from "../Buttons/LinkImgBtn";

interface HeaderProps {
  owner: FriendType;
  published: string;
  postID: string;
}
const PostHeader = ({ owner, published, postID }: HeaderProps) => {
  const mainProfile: FriendType = useAppSelector(
    (state) => state.friend.mainProfile
  );
  const postDetail: number = useAppSelector((state) => state.tool.postDetail);

  const dispatch = useAppDispatch();
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
              console.log({ postDetail });
              // dispatch(setPostDetail(postID));
            }}
            className="icon-btn bg-primaryMediumDark hover:bg-primaryMedium"
          >
            <FontAwesomeIcon icon={faEllipsis} className="text-xl" />
          </button>
          {/* {postDetail === postID && (
            <div className="absolute w-52 h-32 bg-primaryMedium rounded-md right-0 z-10 p-3">
              <IconRoundTextButton text="Delete Post" icon={faTrashAlt} />
            </div>
          )} */}
        </div>
      )}
    </div>
  );
};
export default PostHeader;
