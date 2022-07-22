import Image from "next/image";
import React from "react";
import { PostType } from "../../typing.d";

interface Props {
  posts: PostType[];
}
const ProfilePhotos = ({ posts }: Props) => {
  return (
    <div className=" bg-primaryMediumDark rounded-md shadow-sm shadow-black mt-5 text-textMedium p-5">
      <h1 className="text-xl text-textLight font-semibold mb-3">Photos</h1>
      <div className="grid grid-cols-3 gap-1 rounded-md overflow-hidden">
        {posts.map((post: PostType) => {
          return (
            <div key={post.id} className="w-full h-auto img-base">
              <Image
                src={post.image}
                alt={post.publishDate}
                width={70}
                height={70}
                layout="responsive"
                className="img-base"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProfilePhotos;
