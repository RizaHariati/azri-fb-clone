import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import { FriendType } from "../../typing.d";
import LoadingSpinner from "../LoadingSpinner";

const ProfileFriends = () => {
  const friendList: FriendType[] = useAppSelector(
    (state) => state.friend.friendList
  );
  const router = useRouter();

  if (friendList.length < 1)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  else {
    if (!router.query?.id) {
      return (
        <div className=" bg-primaryMedium rounded-md shadow-sm shadow-black mt-5 text-textMedium p-5 ">
          <h1 className="text-xl text-textLight font-semibold mb-3">Photos</h1>
          <div className="grid grid-cols-3 gap-2">
            {friendList.slice(0.9).map((friend: FriendType, index: number) => {
              if (index < 9) {
                return <FriendLink friend={friend} key={friend.id} />;
              }
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div className=" bg-primaryMediumDark rounded-md shadow-sm shadow-black mt-5 text-textMedium p-5 ">
          <h1 className="text-xl text-textLight font-semibold mb-3">Photos</h1>
          <div className="grid grid-cols-3 gap-2">
            {friendList
              .filter((friend: FriendType) => friend.id !== router.query.id)
              .map((friend: FriendType, index: number) => {
                if (index < 9) {
                  return <FriendLink friend={friend} key={friend.id} />;
                }
              })}
          </div>
        </div>
      );
    }
  }
};
// friendList.slice(0.9).map((friend: FriendType) => {});
export default ProfileFriends;

interface Props {
  friend: FriendType;
}

const FriendLink = ({ friend }: Props) => {
  return (
    <Link href={`/profile/${friend.id}`} key={friend.id}>
      <div className="w-full h-auto  overflow-hidden cursor-pointer hover:opacity-90 transition-all shadow-sm shadow-black active:opacity-75">
        <div className="img-base rounded-md">
          <Image
            src={friend.picture}
            alt={friend.firstName}
            width={70}
            height={70}
            layout="responsive"
            className="img-base rounded-md"
          />
        </div>
        <p className="text-textPrimary text-xs">
          {friend.firstName} {friend.lastName}
        </p>
      </div>
    </Link>
  );
};
