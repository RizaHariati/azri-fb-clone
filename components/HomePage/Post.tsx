import Link from "next/link";
import React, { LegacyRef, useState } from "react";
import { CommentType, PostType } from "../../typing.d";
import PostComment from "./PostComment";
import PostContent from "./PostContent";
import PostHeader from "./PostHeader";

const URL_COMMENT = "https://dummyapi.io/data/v1/post/";

const config = {
  method: "GET",
  headers: { "app-id": "615d134132c9c40bf2a39437" },
};

interface Props {
  post: PostType;
}
const Post = ({ post }: Props) => {
  const [openComment, setOpenComment] = useState<boolean>(false);
  const [commentList, setCommentList] = useState<CommentType[]>([]);
  const getComments = async (id: string) => {
    if (openComment === false) {
      try {
        const res = await fetch(URL_COMMENT + id + "/comment", config);
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

  return (
    <div className="post-container">
      {/* -------------------------- postHeader -------------------------- */}
      <PostHeader
        owner={post.owner}
        published={post.publishDate}
        postID={post.id}
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
      {openComment && <PostComment commentList={commentList} />}
    </div>
  );
};

export default Post;
