import {
  faRectangleTimes,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import moment from "moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { CommentType } from "../../../typing.d";
import IconBtn from "../../Buttons/IconBtn";
import toast from "react-hot-toast";
const config = {
  method: "GET",
  headers: { "app-id": process.env.KEYWORD_API || "key" },
};
import { addMoreComments } from "../../../app/store/post";
import { configDelete, URL_COMMENT } from "../../../util/configAPI";

/* ---------------------------------------------------------------- */
/*                        start main function                       */
/* ---------------------------------------------------------------- */
const NotificationMenu = () => {
  const { comments, commentPage } = useAppSelector((state) => state.post);
  const [dataComments, setDataComments] = useState<CommentType[]>([]);
  const { mainProfile } = useAppSelector((state) => state.friend);
  const dispatch = useAppDispatch();

  const { ref, inView } = useInView();
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (inView) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const fetchData = async () => {
    try {
      const res = await fetch(
        URL_COMMENT + "?limit=5&page=" + commentPage,
        config
      );
      const data = await res.json();
      if (data.data) {
        dispatch(addMoreComments(comments.concat(data.data)));
        setDataComments((prev) => [...prev, ...data.data]);

        setTimeout(() => {}, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleHide = async (id: string) => {
    try {
      const res = await fetch(URL_COMMENT + id, configDelete);
      const data = await res.json();
      if (data.id === id) {
        toast.success("Comment hidden");

        const filterComments = dataComments.filter(
          (comment: CommentType) => comment.id !== id
        );
        setDataComments(filterComments);
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
        {dataComments.map((comment: CommentType, index: number) => {
          const date = moment(comment.publishDate).format("LL");
          if (dataComments.length - 1 === index) {
            return (
              <div
                key={comment.id}
                ref={ref}
                className="grid grid-cols-9 cursor-pointer items-center hover:bg-primaryMedium p-2 sm:rounded-md transition-all group"
              >
                <div className="object-full object-center w-14 h-14 col-span-2 rounded-full overflow-hidden">
                  <Image
                    src={comment.owner.picture}
                    alt={comment.owner.firstName}
                    width={60}
                    height={60}
                    className="img-base rounded-full"
                  />
                </div>
                <div className="text-sm col-span-6">
                  {comment.owner.id === mainProfile?.id && (
                    <p> You commented: </p>
                  )}
                  {comment.owner.id !== mainProfile?.id && (
                    <p>
                      {comment.owner.firstName} {comment.owner.lastName}
                      commented:
                    </p>
                  )}
                  <p>{comment.message} </p>
                  <p className="text-xs text-textDark">{date} </p>
                </div>
                <IconBtn
                  text="Hide notification"
                  icon={faRectangleTimes}
                  btnClass="icon-btn block sm:hidden group-hover:block"
                  onClick={() => handleHide(comment.id)}
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
                  {comment.owner.id === mainProfile?.id && (
                    <p> You commented: </p>
                  )}
                  {comment.owner.id !== mainProfile?.id && (
                    <p>
                      {comment.owner.firstName} {comment.owner.lastName}
                      commented:
                    </p>
                  )}
                  <p>{comment.message} </p>
                  <p className="text-xs text-textDark">{date} </p>
                </div>
                <IconBtn
                  text="hide notificationn"
                  icon={faRectangleTimes}
                  btnClass="icon-btn "
                  onClick={() => handleHide(comment.id)}
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
