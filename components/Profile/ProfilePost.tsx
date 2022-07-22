import React from "react";
import { useAppSelector } from "../../app/hooks";
import { PostType } from "../../typing.d";
import Post from "../HomePage/Post";

interface Props {
  profilePost: PostType[];
}
const ProfilePost = ({ profilePost }: Props) => {
  if (profilePost.length < 1) return <div></div>;
  else {
    return (
      <div>
        {profilePost.map((post: PostType) => {
          return <Post post={post} key={post.id} />;
        })}
      </div>
    );
  }
};

export default ProfilePost;
