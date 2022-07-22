import {
  faImage,
  faLaugh,
  faStickyNote,
} from "@fortawesome/free-regular-svg-icons";
import { faCamera, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import { CommentType, FriendType } from "../../typing.d";
import LinkImgButton from "../Buttons/LinkImgButton";

interface Props {
  commentList?: CommentType[];
}
const PostComment = ({ commentList }: Props) => {
  const mainProfile: FriendType = useAppSelector(
    (state) => state.friend.mainProfile
  );
  return (
    <div>
      <hr className="w-full mb-3 border-b border-primaryMedium" />

      <div className="grid grid-cols-9 mt-5 px-5">
        <LinkImgButton
          src={
            mainProfile?.picture
              ? mainProfile.picture
              : "/images/websiteImages/profile.jpg"
          }
          href="/profile"
          imgClass="img-icon-small"
        />

        <form className="post-comment-form">
          <textarea
            placeholder="Write a comment"
            className="post-comment-input "
          />
          <div className="flex gap-2 ml-auto float-left text-textDark">
            <FontAwesomeIcon icon={faLaugh} className="text-lg" />
            <FontAwesomeIcon icon={faCamera} className="text-lg" />
            <FontAwesomeIcon icon={faImage} className="text-lg" />
            <FontAwesomeIcon icon={faStickyNote} className="text-lg" />
          </div>
        </form>
      </div>

      {commentList && commentList.length > 0 && (
        <div className="my-2">
          {commentList.map((comment: CommentType) => {
            return (
              <div key={comment.id} className="grid grid-cols-9 mt-5 px-5 ">
                <LinkImgButton
                  src={comment.owner.picture}
                  href="/profile"
                  imgClass="img-icon-small"
                />

                <div className="col-span-7 w-full bg-primaryMedium rounded-3xl h-fit py-2 px-4">
                  <p className="text-xs font-medium text-textPrimary">{`${comment.owner.firstName} ${comment.owner.lastName}`}</p>
                  <p className="text-xs text-textLight">{comment.message}</p>
                </div>
                <button className="icon-btn h-8 w-8 bg-primaryMediumDark hover:bg-primaryMedium place-self-center">
                  <FontAwesomeIcon icon={faEllipsis} className="text-lg" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PostComment;
