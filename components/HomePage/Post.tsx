import axios from "axios";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "../../app/hooks";
import { CommentType, PostType } from "../../typing.d";
import {
  configDelete,
  configGet,
  header,
  URL_COMMENT,
  URL_POST,
} from "../../util/configAPI";
import PostComment from "./PostComment";
import PostContent from "./PostContent";
import PostHeader from "./PostHeader";

interface Props {
  post: PostType;
  setMainPosts?: React.Dispatch<React.SetStateAction<PostType[]>>;
  setProfilePostsState?: React.Dispatch<React.SetStateAction<PostType[]>>;
  setGuestPostsState?: React.Dispatch<React.SetStateAction<PostType[]>>;
}
const Post = ({
  post,
  setMainPosts,
  setProfilePostsState,
  setGuestPostsState,
}: Props) => {
  const { mainProfile } = useAppSelector((state) => state.friend);
  const postCommenSection: string = useAppSelector(
    (state) => state.tool.postCommentSection
  );
  const [openComment, setOpenComment] = useState<boolean>(false);
  const [commentList, setCommentList] = useState<CommentType[]>([]);
  const [commentData, setCommentData] = useState({
    message: "",
    owner: "",
    post: "",
  });

  /* ------------------------- post comments ------------------------ */
  useEffect(() => {
    if (mainProfile.id) {
      setCommentData({ ...commentData, owner: mainProfile.id, post: post.id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (commentData.message) {
      fetchPostComment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentData]);

  const fetchPostComment = async () => {
    if (!commentData.message || !mainProfile.id) return;

    axios({
      method: "POST",
      headers: header,
      url: `${URL_COMMENT}create`,
      data: commentData,
    })
      .then((res) => {
        if (res.status === 200) {
          setCommentList((prev) => [...prev, res.data]);
          setCommentData({ ...commentData, message: "" });
          toast.success("Comment posted!");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>, text: string) => {
    e.preventDefault();
    setCommentData({ ...commentData, message: text });
  };

  /* ------------------------ fetch comments ------------------------ */

  const getComments = async (id: string) => {
    if (postCommenSection === id) {
      try {
        const res = await fetch(URL_POST + id + "/comment", configGet);
        const comments = await res.json();

        if (comments.data.length > 0) {
          setCommentList(comments.data);
        }
      } catch (error) {
        console.log(error);
      }
      setOpenComment(!openComment);
    } else {
      setOpenComment(false);
    }
  };

  /* ------------------------ delete comments ------------------------ */

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(URL_COMMENT + id, configDelete);
      const data = await res.json();
      if (data.id === id) {
        toast.success("Comment Deleted");
        const filterComments = commentList.filter(
          (comment: CommentType) => comment.id !== id
        );
        setCommentList(filterComments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post-container">
      {/* -------------------------- postHeader -------------------------- */}
      <PostHeader
        owner={post.owner}
        published={post.publishDate}
        postID={post.id}
        setMainPosts={setMainPosts}
        setProfilePostsState={setProfilePostsState}
        setGuestPostsState={setGuestPostsState}
      />

      {/* -------------------------- postContent ------------------------- */}
      <PostContent
        text={post.text}
        image={post.image}
        likes={post.likes}
        getComments={getComments}
        postId={post.id}
      />

      {/* -------------------------- postComment ------------------------- */}
      {postCommenSection === post.id && (
        <PostComment
          commentList={commentList}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Post;
