import Image from "next/image";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import { FriendType } from "../../typing.d";

const ProfileFriends = () => {
  const friendList: FriendType[] = useAppSelector(
    (state) => state.friend.friendList
  ).slice(0, 9);
  return (
    <div className=" bg-primaryMediumDark rounded-md shadow-sm shadow-black mt-5 text-textMedium p-5">
      <h1 className="text-xl text-textLight font-semibold mb-3">Photos</h1>
      <div className="grid grid-cols-3 gap-2">
        {friendList.map((friend: FriendType) => {
          return (
            <div
              key={friend.id}
              className="w-full h-auto img-base rounded-md overflow-hidden"
            >
              <Image
                src={friend.picture}
                alt={friend.firstName}
                width={70}
                height={70}
                layout="responsive"
                className="img-base"
              />
              <p className="text-textPrimary text-xs">
                {friend.firstName} {friend.lastName}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileFriends;
