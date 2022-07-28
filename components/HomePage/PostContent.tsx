import {
  faComment,
  faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";
import {
  faHeart,
  faMessage,
  faShare,
  faShareAlt,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { openCommentSection } from "../../app/store/tool";
import { FriendType } from "../../typing.d";

interface ContentProps {
  text: string;
  image: string;
  likes: number;
  getComments: (id: any) => void;
  postId: string;
}
const PostContent = ({
  text,
  image,
  likes,
  getComments,
  postId,
}: ContentProps) => {
  const { friendList } = useAppSelector((state) => state.friend);
  const [likePost, setLikePost] = useState(false);
  const [likesTotal, setLikesTotal] = useState(likes);
  // const { likePost } = useAppSelector((state) => state.tool);
  const dispatch = useAppDispatch();
  const friend: FriendType = friendList[Math.floor(Math.random() * 19)];
  const handleLike = () => {
    if (!likePost) {
      setLikePost(true);
      setLikesTotal(likes + 1);
    } else {
      setLikePost(false);
      setLikesTotal(likes);
    }
  };
  return (
    <div className=" text-textMedium">
      <div className="px-5 py-3">
        <p>{text}</p>
      </div>
      <div className="w-full h-80 img-base overflow-hidden z-0">
        <Image
          src={image}
          width={250}
          height={250}
          layout="responsive"
          className="img-base z-0"
          alt={image}
        />
      </div>
      <div className="flex items-center px-3 md:px-5 py-3 text-textDark text-xs">
        {(!likes || likes === 0) && (
          <div className=" col-span-7 flex items-center gap-1 "></div>
        )}
        {likes > 0 && likes <= 10 && (
          <div className=" flex items-center gap-1  ">
            <div className="w-5 h-5 flex items-center justify-center bg-blue-600 rounded-full">
              <FontAwesomeIcon
                icon={faThumbsUp}
                className=" text-textMedium text-xs"
              />
            </div>
            {likePost && (
              <p className="text-xs">{`You, and ${likesTotal} others`}</p>
            )}
            {!likePost && (
              <p className="text-xs">
                {`${friend?.firstName} ${friend?.lastName} and ${likesTotal} others`}
              </p>
            )}
          </div>
        )}
        {likes > 0 && likes > 10 && (
          <div className="col-span-6 flex items-center gap-1 ">
            <div className="w-5 h-5 flex items-center justify-center bg-blue-600 rounded-full ">
              <FontAwesomeIcon
                icon={faThumbsUp}
                className="text-textMedium text-xs"
              />
            </div>
            <div className="w-5 h-5 flex items-center justify-center bg-red-600 rounded-full ">
              <FontAwesomeIcon
                icon={faHeart}
                className="text-textMedium text-xs"
              />
            </div>
            {!likePost && (
              <p className="text-xs">
                {`${friend?.firstName}, ${friend?.lastName} and ${likesTotal} others`}
              </p>
            )}
            {likePost && (
              <p className="text-xs">{`You, ${friend?.lastName}, ${friend?.firstName} and ${likesTotal} others`}</p>
            )}
          </div>
        )}
      </div>
      {/* ------------------------- postReaction ------------------------- */}
      <div className=" items-center justify-center gap-1 text-center h-10 px-2 md:px-5 border-t border-primaryMedium grid grid-cols-3">
        <button
          onClick={() => handleLike()}
          className="h-8 active:bg-primaryMediumLight hover:bg-primaryMedium rounded-md flex gap-2 items-center justify-center"
        >
          <FontAwesomeIcon
            icon={faThumbsUp}
            className={
              likePost ? "text-xl text-accentMain font-bold " : "text-lg"
            }
          />
          Like
        </button>
        <button
          onClick={() => {
            dispatch(openCommentSection(postId));
            getComments(postId);
          }}
          className="h-8 active:bg-primaryMediumLight hover:bg-primaryMedium rounded-md flex gap-2 items-center justify-center"
        >
          <FontAwesomeIcon icon={faMessage} className="text-lg" />
          Comment
        </button>
        <button className="h-8 active:bg-primaryMediumLight hover:bg-primaryMedium rounded-md flex gap-2 items-center justify-center">
          <FontAwesomeIcon icon={faShareAlt} className="text-lg " />
          Share
        </button>
      </div>
    </div>
  );
};

export default PostContent;
