import { faTimes } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  closeNavbarMenu,
  removeImagePost,
  resetPosts,
} from "../../../app/store/post";
import { closePostModal } from "../../../app/store/tool";
import { PostDataType, PostType } from "../../../typing.d";
import {
  configGetPublic,
  header,
  URL_BASE,
  URL_POST,
} from "../../../util/configAPI";
import IconBtn from "../../Buttons/IconBtn";
import LinkImgTextBtn from "../../Buttons/LinkImgTextBtn";
import PostingFormImage from "../../HomePage/PostingFormImage";
import LoadingSpinner from "../../LoadingSpinner";

const ModalPost = () => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState<string>("");
  const [data, setData] = useState<PostDataType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { imagePost } = useAppSelector((state) => state.post);
  const { mainProfile } = useAppSelector((state) => state.friend);
  const router = useRouter();

  const fetchImage = async () => {
    try {
      const res = await fetch(`${URL_BASE}tag/nature/post`, configGetPublic);
      const imagePosts = await res.json();
      if (imagePosts.data) {
        const image: PostType =
          imagePosts.data[Math.floor(Math.random() * imagePosts.data.length)];
        const randomNumber = Math.floor(Math.random() * 100);
        setData({
          text,
          image: image.image,
          likes: randomNumber,
          owner: mainProfile.id,
        });
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(closeNavbarMenu());
    if (!data) {
      return;
    }
    fetchPostData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const fetchPostData = async (data: PostDataType) => {
    setLoading(true);
    if (!data) return;
    await axios({
      method: "post",
      url: URL_POST + "create",
      headers: header,
      data,
    })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Your Post is successfully sent");
          dispatch(closePostModal());
          setText("");
          dispatch(resetPosts());
          setLoading(false);
          setTimeout(() => {
            router.reload();
          }, 1000);
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
    await fetchImage();
    return;
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
              dispatch(removeImagePost());
            }}
          />
        </div>
        <div>
          <div className="h-full flex flex-col gap-2 ">
            <h2 className="text-textLight text-xl font-bold w-full text-center">
              Create post
            </h2>
            <hr className="w-full my-2 border-b border-primaryMediumLight" />
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
          </div>

          <hr className="w-full my-5 border-b border-primaryMediumLight" />
          {loading && <LoadingSpinner />}
          {!loading && (
            <div className="posting-form-image">
              <div>
                <textarea
                  rows={4}
                  value={text}
                  placeholder={`what's on your mind,  ${mainProfile.firstName} ?`}
                  className={
                    imagePost ? "text-area-modal text-sm" : "text-area-modal "
                  }
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

              {!imagePost && (
                <div className="border border-primaryMedium rounded-md h-16 w-full flex justify-center items-center px-2 ">
                  <PostingFormImage />
                </div>
              )}
              <button
                onClick={() => handleSubmit()}
                type="button"
                className=" bg-accentMain h-10 text-textLight flex  hover:bg-accentDark rounded-md transition-all relative  justify-center items-center  text-sm font-medium gap-2 p-3 my-2 text-center w-full uppercase"
              >
                <p>Post</p>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalPost;
