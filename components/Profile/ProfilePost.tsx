import React from "react";
import { useAppSelector } from "../../app/hooks";
import { PostType } from "../../typing.d";
import postIDExist from "../../util/postExist";
import Post from "../HomePage/Post";

interface Props {
  profilePost: PostType[];
}
const ProfilePost = ({ profilePost }: Props) => {
  const hiddenPost: string[] = useAppSelector((state) => state.post.hiddenPost);
  if (profilePost.length < 1) return <div></div>;
  else {
    return (
      <div>
        {profilePost
          .filter((post: PostType) => {
            if (postIDExist(hiddenPost, post.id)) {
              return false;
            } else {
              return true;
            }
          })
          .map((post: PostType) => {
            return <Post post={post} key={post.id} />;
          })}
      </div>
    );
  }
};

export default ProfilePost;
