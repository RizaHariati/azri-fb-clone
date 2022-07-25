import { faTimes } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { removeImagePost, resetPosts } from "../../../app/store/post";
import { closePostModal } from "../../../app/store/tool";
import { PostDataType } from "../../../typing.d";
import IconBtn from "../../Buttons/IconBtn";
import LinkImgTextBtn from "../../Buttons/LinkImgTextBtn";
import PostingFormImage from "../../HomePage/PostingFormImage";

const ModalPost = () => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState<string>("");
  const { imagePost } = useAppSelector((state) => state.post);
  const { mainProfile } = useAppSelector((state) => state.friend);
  const URL_POST = "https://dummyapi.io/data/v1/post/";
  const headers = { "app-id": "615d134132c9c40bf2a39437" };
  const router = useRouter();
  const fetchPostData = async (data: PostDataType) => {
    axios({
      method: "post",
      url: URL_POST + "create",
      headers,
      data,
    })
      .then((res) => {
        if (res.status) {
          toast.success("Your Post is successfully sent");
          dispatch(closePostModal());
          setText("");
          dispatch(resetPosts());
          router.reload();
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async () => {
    if (!text) {
      toast.error("You have not written anything");
      return;
    }
    if (!imagePost) {
      toast.error("Please select an image");
      return;
    }
    const randomNumber = Math.floor(Math.random() * 100);
    const data = {
      text,
      image: imagePost,
      likes: randomNumber,
      owner: mainProfile.id,
    };
    fetchPostData(data);
  };

  return (
    <div className="modal-base ">
      <div className="modal-container">
        <div className="absolute right-3 top-3">
          <IconBtn
            icon={faTimes}
            text="Close"
            onClick={() => {
              dispatch(closePostModal());
            }}
          />
        </div>
        <div>
          <h2 className="text-textLight text-xl font-bold w-full text-center">
            Create post
          </h2>
          <hr className="w-full my-2 border-b border-primaryMedium" />
          <div className="grid  grid-cols-2">
            {mainProfile?.id !== "" && (
              <LinkImgTextBtn
                href="/profile"
                src={
                  mainProfile?.picture
                    ? mainProfile.picture
                    : "/images/profile/profile.png"
                }
                text={mainProfile.firstName + " " + mainProfile.lastName}
                icon=""
                onClick={() => dispatch(closePostModal())}
              />
            )}
          </div>

          <hr className="w-full my-5 border-b border-primaryMedium" />

          <div className="posting-form-image">
            <div>
              <textarea
                rows={4}
                value={text}
                placeholder={`what's on your mind,  ${mainProfile.firstName} ?`}
                className="text-area-modal"
                onChange={(e: any) => {
                  setText(e.target.value);
                }}
              />
            </div>

            {imagePost && (
              <div className="text-textLight img-base w-full h-40 overflow-hidden my-2 relative">
                <Image
                  src={imagePost}
                  alt="test"
                  width={600}
                  height={300}
                  className="img-base"
                />
                <button
                  onClick={() => dispatch(removeImagePost())}
                  className="text-red-700 hover:text-red-600 active:text-red-800 z-50 top-1 right-3 absolute font-bold "
                >
                  X Remove
                </button>
              </div>
            )}
            <div className="border border-primaryMedium rounded-md h-16 w-full flex justify-center items-center px-2 ">
              <PostingFormImage />
            </div>
            <button
              onClick={() => handleSubmit()}
              type="button"
              className=" bg-accentMain h-10 text-textLight flex  hover:bg-accentDark rounded-md transition-all relative  justify-center items-center  text-sm font-medium gap-2 p-3 my-2 text-center w-full"
            >
              <p>Post</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPost;
