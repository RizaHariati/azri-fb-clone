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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

      toast.success("Comment hidden");
      const filterComments = dataComments.filter(
        (comment: CommentType) => comment.id !== id
      );
      setDataComments(filterComments);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="notification-menu">
      <h3 className=" text-textLight text-xl font-semibold pt-5 px-3 md:px-5 ">
        Notifications
      </h3>
      <hr className="w-full border-b border-primaryMedium" />
      <div className="notifications-container">
        {dataComments.map((comment: CommentType, index: number) => {
          if (dataComments.length - 1 === index) {
            return (
              <div
                key={comment.id}
                ref={ref}
                className=" notification-line group"
              >
                <Notifications comment={comment} handleHide={handleHide} />
              </div>
            );
          } else {
            return (
              <div key={comment.id} className=" notification-line group">
                <Notifications comment={comment} handleHide={handleHide} />
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

interface Props {
  comment: CommentType;
  handleHide: (id: string) => Promise<void>;
}

const Notifications = ({ comment, handleHide }: Props) => {
  const { mainProfile } = useAppSelector((state) => state.friend);
  const date = moment(comment.publishDate).format("LL");
  return (
    <>
      <div className="col-span-1">
        <Image
          src={comment.owner.picture}
          alt={comment.owner.firstName}
          width={60}
          height={60}
          className="img-base rounded-full"
        />
      </div>
      <div className="text-sm col-span-4">
        {comment.owner.id === mainProfile?.id && <p> You commented: </p>}
        {comment.owner.id !== mainProfile?.id && (
          <p>
            {comment.owner.firstName} {comment.owner.lastName}
            commented:
          </p>
        )}
        <p>{comment.message} </p>
        <p className="text-xs text-textDark">{date} </p>
      </div>
      <button
        onClick={() => handleHide(comment.id)}
        className="icon-btn w-10 h-10 col-span-1 ml-auto rounded-full"
      >
        <FontAwesomeIcon icon={faRectangleTimes} className="text-sm" />
        <p className="icon-note">hide notification</p>
      </button>
    </>
  );
};
