import { faTrash } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addMoreComments } from "../../../app/store/post";

import { CommentType } from "../../../typing.d";
import IconButton from "../../Buttons/IconButton";

const config = {
  method: "GET",
  headers: { "app-id": process.env.KEYWORD_API || "key" },
};

const NotificationMenu = () => {
  const { comments, commentPage } = useAppSelector((state) => state.post);

  const dispatch = useAppDispatch();

  const { ref, inView } = useInView();
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (inView) {
      fetchData();
    }
  }, [inView]);

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://dummyapi.io/data/v1/comment/?limit=10&page=" + commentPage,
        config
      );
      const data = await res.json();
      if (data.data) {
        dispatch(addMoreComments(comments.concat(data.data)));
        setTimeout(() => {}, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {
    console.log(commentPage, " delete");
  };
  return (
    <div className="notification-menu">
      <h3 className=" text-textLight text-xl font-semibold px-5 pt-5 ">
        Notifications
      </h3>
      <hr className="w-full my-3 border-b border-primaryMedium" />
      <div className="notifications-container">
        {comments.map((comment: CommentType, index: number) => {
          const date = moment(comment.publishDate).format("LL");
          if (comments.length - 1 === index) {
            return (
              <div
                key={comment.id}
                ref={ref}
                className="grid grid-cols-9 cursor-pointer items-center hover:bg-primaryMedium p-2 sm:rounded-md transition-all group"
              >
                <div className="object-full object-center w-14 h-14 col-span-2 rounded-full overflow-hidden  ">
                  <Image
                    src={comment.owner.picture}
                    alt={comment.owner.firstName}
                    width={60}
                    height={60}
                    className="img-base rounded-full"
                  />
                </div>
                <div className="text-sm col-span-6">
                  <p>
                    {comment.owner.firstName} {comment.owner.lastName}{" "}
                    commented:
                  </p>
                  <p>"{comment.message} "</p>
                  <p className="text-xs text-textDark">{date} </p>
                </div>
                <IconButton
                  text="delete"
                  icon={faTrash}
                  btnClass="icon-btn block sm:hidden group-hover:block"
                  onClick={() => handleDelete()}
                />
              </div>
            );
          } else {
            return (
              <div
                key={comment.id}
                className="grid grid-cols-9 cursor-pointer items-center hover:bg-primaryMedium rounded-md transition-all group  mb-2 p-2 "
              >
                <div className="object-full object-center w-14 h-14 col-span-2 rounded-full overflow-hidden  ">
                  <Image
                    src={comment.owner.picture}
                    alt={comment.owner.firstName}
                    width={60}
                    height={60}
                    className="img-base rounded-full"
                  />
                </div>
                <div className="text-sm col-span-6">
                  <p>
                    {comment.owner.firstName} {comment.owner.lastName}{" "}
                    commented:
                  </p>
                  <p>"{comment.message} "</p>
                  <p className="text-xs text-textDark">{date} </p>
                </div>
                <IconButton
                  text="delete"
                  icon={faTrash}
                  btnClass="icon-btn block sm:hidden group-hover:block"
                  onClick={() => handleDelete()}
                />
              </div>
            );
          }
        })}
        {inView && <p>Loading more comments...</p>}
      </div>
    </div>
  );
};

export default NotificationMenu;
