import { faComment } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart,
  faShare,
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
      <div className=" w-full h-80 img-base overflow-hidden z-0">
        <Image
          src={image}
          width={450}
          height={450}
          layout="responsive"
          className="img-base z-0"
          alt={image}
        />
      </div>
      <div className="grid grid-cols-9 px-5 py-3 text-textDark">
        {(!likes || likes === 0) && (
          <div className=" col-span-7 flex items-center gap-1 "></div>
        )}
        {likes > 0 && likes <= 10 && (
          <div className=" col-span-6 flex items-center gap-1 ">
            <div className="w-5 h-5 flex items-center justify-center bg-blue-600 rounded-full">
              <FontAwesomeIcon
                icon={faThumbsUp}
                className=" text-textMedium w-3 h-3 rounded-full"
              />
            </div>
            {likePost && <p>{`You, and ${likesTotal} others`}</p>}
            {!likePost && (
              <p>
                {`${friend?.firstName} ${friend?.lastName} and ${likesTotal} others`}
              </p>
            )}
          </div>
        )}
        {likes > 0 && likes > 10 && (
          <div className="col-span-6 flex items-center gap-1 ">
            <div className="w-5 h-5 flex items-center justify-center bg-blue-600 rounded-full">
              <FontAwesomeIcon
                icon={faThumbsUp}
                className=" text-textMedium w-3 h-3 rounded-full"
              />
            </div>
            <div className="w-5 h-5 flex items-center justify-center bg-red-600 rounded-full">
              <FontAwesomeIcon
                icon={faHeart}
                className=" text-textMedium w-3 h-3 rounded-full"
              />
            </div>
            {!likePost && (
              <p>
                {`${friend?.firstName}, ${friend?.lastName} and ${likesTotal} others`}
              </p>
            )}
            {likePost && (
              <p>{`You, ${friend?.lastName}, ${friend?.firstName} and ${likesTotal} others`}</p>
            )}
          </div>
        )}
        <button
          className="col-start-7 col-span-2 text-right"
          onClick={() => {
            dispatch(openCommentSection(postId));
            getComments(postId);
          }}
        >
          <p className=" underline underline-offset-2 text-textDark hover:text-textMedium">
            comments
          </p>
        </button>
      </div>
      {/* ------------------------- postReaction ------------------------- */}
      <div className="flex items-center justify-center gap-2 text-center h-10 px-5 border-t border-primaryMedium">
        <button
          onClick={() => handleLike()}
          className="h-10 w-10  sm:h-11 sm:w-full bg-none text-textDark flex items-center justify-center hover:bg-primaryMedium rounded-md transition-all relative focus:h-full gap-2"
        >
          <FontAwesomeIcon
            icon={faThumbsUp}
            className={
              likePost ? "text-xl text-accentMain font-bold " : "text-xl"
            }
          />
          Like
        </button>
        <button
          onClick={() => {
            dispatch(openCommentSection(postId));
            getComments(postId);
          }}
          className="icon-btn-square w-full text-sm font-medium gap-2 focus:border-none foc"
        >
          <FontAwesomeIcon icon={faComment} className="text-xl" />
          Comment
        </button>
        <button className="icon-btn-square w-full text-sm font-medium gap-2 focus:border-none">
          <FontAwesomeIcon icon={faShare} className="text-xl " />
          Share
        </button>
      </div>
    </div>
  );
};

export default PostContent;
