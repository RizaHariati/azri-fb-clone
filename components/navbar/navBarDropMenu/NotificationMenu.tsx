import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import moment from "moment";
import Image from "next/image";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  addMoreComments,
  handleDeleteNotification,
} from "../../../app/store/post";
import { CommentType } from "../../../typing.d";
import IconBtn from "../../Buttons/IconBtn";
import toast from "react-hot-toast";
const config = {
  method: "GET",
  headers: { "app-id": process.env.KEYWORD_API || "key" },
};

const configDelete = {
  method: "DELETE",
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

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
        "https://dummyapi.io/data/v1/comment/" + id,
        configDelete
      );
      const data = await res.json();
      if (data.id === id) {
        toast.success("Comment Deleted");
        dispatch(handleDeleteNotification());
      }
    } catch (error) {
      console.log(error);
    }
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
                <IconBtn
                  text="delete"
                  icon={faTrashCan}
                  btnClass="icon-btn block sm:hidden group-hover:block"
                  onClick={() => handleDelete(comment.id)}
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
                <IconBtn
                  text="delete"
                  icon={faTrashCan}
                  btnClass="icon-btn "
                  onClick={() => handleDelete(comment.id)}
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
