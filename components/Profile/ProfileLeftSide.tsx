import React from "react";
import { FullProfileType, PostType } from "../../typing.d";
import ProfileFriends from "./ProfileFriends";
import ProfileInfo from "./ProfileInfo";
import ProfilePhotos from "./ProfilePhotos";

interface Props {
  fullProfile: FullProfileType;
  profilePosts: PostType[];
}
const ProfileLeft = ({ fullProfile, profilePosts }: Props) => {
  if (!fullProfile) return <div></div>;
  else {
    return (
      <div className="profile-left ">
        <ProfileInfo profile={fullProfile} />
        <ProfilePhotos posts={profilePosts.slice(0, 6)} />
        <ProfileFriends />
        <p className=" text-xs text-textLight my-10 w-full text-center hidden md:block">
          Privacy · Terms · Advertising · Ad choices · Cookies · · Meta © 2022
        </p>
      </div>
    );
  }
};

export default ProfileLeft;
