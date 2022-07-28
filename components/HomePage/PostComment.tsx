import {
  faImage,
  faLaugh,
  faStickyNote,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { CommentType, FriendType } from "../../typing.d";
import LinkImgBtn from "../Buttons/LinkImgBtn";

interface Props {
  commentList: CommentType[];
  handleSubmit: (e: ChangeEvent<HTMLFormElement>, text: string) => void;
  handleDelete: (id: string) => void;
}

const PostComment = ({ commentList, handleSubmit, handleDelete }: Props) => {
  const [text, setText] = useState<string>("");
  const mainProfile: FriendType = useAppSelector(
    (state) => state.friend.mainProfile
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };
  const [openComment, setOpenComment] = useState<boolean>(false);

  useEffect(() => {
    if (commentList && commentList.length > 0) {
      setOpenComment(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentList]);

  return (
    <div>
      <hr className="w-full mb-3 border-b border-primaryMedium" />

      <div className="grid grid-cols-9 mt-5 px-5">
        <LinkImgBtn
          src={
            mainProfile?.picture
              ? mainProfile.picture
              : "/images/websiteImages/profile.jpg"
          }
          href="/profile"
          imgClass="img-icon-small"
        />

        <form
          className="post-comment-form"
          onSubmit={(e: any) => {
            handleSubmit(e, text);
            setText("");
          }}
        >
          <input
            type="text"
            placeholder="Write a comment"
            className="post-comment-input "
            value={text}
            onChange={(e) => handleChange(e)}
          />
          {!text && (
            <div className="flex gap-2 ml-auto float-left text-textDark">
              <FontAwesomeIcon icon={faLaugh} className="text-lg" />
              <FontAwesomeIcon icon={faCamera} className="text-lg" />
              <FontAwesomeIcon icon={faImage} className="text-lg" />
              <FontAwesomeIcon icon={faStickyNote} className="text-lg" />
            </div>
          )}
        </form>
      </div>

      {openComment && (
        <div className="my-2">
          {commentList
            .map((comment: CommentType) => {
              return (
                <div key={comment.id} className="grid grid-cols-9 mt-5 px-5 ">
                  <LinkImgBtn
                    src={comment.owner.picture}
                    href="/profile"
                    imgClass="img-icon-small"
                  />

                  <div className="col-span-7 w-full bg-primaryMedium rounded-3xl h-fit py-2 px-4">
                    <p className="text-xs font-medium text-textPrimary">{`${comment.owner.firstName} ${comment.owner.lastName}`}</p>
                    <p className="text-xs text-textLight">{comment.message}</p>
                  </div>
                  {comment.owner.id === mainProfile.id && (
                    <button
                      onClick={() => {
                        handleDelete(comment.id);
                      }}
                      className="icon-btn h-8 w-8 bg-primaryMediumDark hover:bg-primaryMedium place-self-center active:bg-primaryMediumLight"
                    >
                      <FontAwesomeIcon icon={faTrashCan} className="text-lg" />
                    </button>
                  )}
                </div>
              );
            })
            .reverse()}
        </div>
      )}
    </div>
  );
};

export default PostComment;
