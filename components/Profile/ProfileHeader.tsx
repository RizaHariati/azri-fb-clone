import { faCameraRetro, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import { FriendType, FullProfileType, PostType } from "../../typing.d";
import Post from "../HomePage/Post";

import HeaderBar from "./HeaderBar";

interface Props {
  fixHeaderBar: boolean;
  friendList: FriendType[];
  profile: FullProfileType;
  randomNumber: number;
  post: PostType;
  classAddition: string;
}

/* ---------------------------------------------------------------- */
/*                           Main function                          */
/* ---------------------------------------------------------------- */
const ProfileHeader = ({
  fixHeaderBar,
  friendList,
  profile,
  randomNumber,
  post,
  classAddition,
}: Props) => {
  return (
    <div className={`profile-header-container ${classAddition} z-10`}>
      <div className="profile-header ">
        {/* ------------------------- header image ------------------------- */}
        <div className="relative h-full row-span-3 w-full md:rounded-b-lg img-base overflow-hidden bg-primaryMedium">
          {post?.image && (
            <Image
              src={post.image}
              width={1200}
              height={1200}
              layout="responsive"
              alt={post.owner.firstName}
              className="img-base"
            />
          )}
          <button className=" absolute right-3 sm:right-9 bottom-5  icon-round-text-btn hover:bg-textPrimary bg-textLight w-fit z-10">
            <FontAwesomeIcon icon={faCameraRetro} className="text-black" />
            <p className=" text-primaryDark font-normal text-sm hidden md:block">
              Edit Cover Photo
            </p>
          </button>
        </div>

        <div className="h-full row-span-3 md:row-span-2 z-10 grid grid-rows-6 lg:grid-rows-5 grid-cols-1 lg:grid-cols-9 px-0 md:px-10 pb-16 transition-all ">
          <div className="relative w-full flex justify-center row-span-1 md:row-span-2 col-span-1 lg:col-span-2 lg:row-span-5 lg:row-start-1 transition-all items-center  h-full ">
            <div className="profile-header-image bg-primaryMedium ">
              {profile?.picture && (
                <Image
                  src={profile.picture}
                  alt="girl1"
                  width={100}
                  height={100}
                  layout="responsive"
                  className="img-base"
                />
              )}
            </div>
          </div>

          <div className=" w-full text-center row-span-2 flex flex-col items-center justify-center lg:items-start px-0 md:px-10 col-span-1 lg:col-span-7 lg:row-start-2  transition-all">
            <h1 className="text-textLight text-3xl font-bold">
              {profile?.firstName} {profile.lastName}
            </h1>
            <p className=" text-textMedium text-xs">{randomNumber} friends</p>
          </div>
          <div className="w-full row-span-3 md:row-span-2 flex flex-col md:flex-row justify-center md:justify-evenly lg:justify-between pl-0 md:pl-10 gap-2  col-span-1 lg:col-span-7 lg:row-start-  transition-all">
            <div className="flex -space-x-3 items-center justify-center lg:justify-start ">
              {friendList.slice(0, 8).map((friend: FriendType) => {
                return (
                  <div
                    key={friend.id}
                    className="w-10 h-10 rounded-full overflow-hidden img-base border-2 border-primaryMediumDark"
                  >
                    <Image
                      src={friend.picture}
                      alt={friend.firstName}
                      width={30}
                      height={30}
                      layout="responsive"
                      className="img-base"
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center lg:justify-end gap-x-3 items-center ">
              <button className="icon-round-text-btn hover:bg-accentDark bg-accentMain w-fit z-10 ">
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  className="text-textLight"
                />
                <p className=" text-textLight font-normal text-sm">
                  Add to story
                </p>
              </button>
              <button className="icon-round-text-btn hover:bg-primaryMediumLight bg-primaryMedium w-fit z-10">
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  className="text-textLight"
                />
                <p className=" text-textLight font-normal text-sm">
                  Edit Profile
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* -------------------------- header bar -------------------------- */}
        <HeaderBar fixHeaderBar={fixHeaderBar} profile={profile} />
      </div>
    </div>
  );
};

export default ProfileHeader;
