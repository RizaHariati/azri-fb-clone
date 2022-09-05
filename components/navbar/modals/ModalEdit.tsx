import { faTimes } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast, { ErrorIcon } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  closeNavbarMenu,
  removeImagePost,
  resetPosts,
  setImagePost,
} from "../../../app/store/post";
import { closePostModal } from "../../../app/store/tool";
import { PostType } from "../../../typing.d";
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

interface DataType {
  text: string;
  image: string | null | undefined;
}
const ModalEdit = () => {
  const dispatch = useAppDispatch();
  const [editText, setEditText] = useState<string>("");
  const [singlePost, setSinglePost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<DataType | null>(null);

  const { imagePost } = useAppSelector((state) => state.post);
  const { mainProfile } = useAppSelector((state) => state.friend);
  const { postModalID } = useAppSelector((state) => state.tool);

  const router = useRouter();

  /* ------------------------- fetching data ------------------------ */
  const fetchSinglePost = async () => {
    try {
      const res = await fetch(`${URL_POST}${postModalID}`, configGetPublic);
      const singlePostData: PostType = await res.json();
      if (singlePostData) {
        setSinglePost(singlePostData);
        // const singleText = singlePost?.text || null;
        setEditText(singlePostData.text);

        // const image = singlePost?.image || null;
        dispatch(setImagePost(singlePostData.image));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchImage = async (newText: string) => {
    if (!singlePost) return;
    try {
      const res = await fetch(`${URL_BASE}tag/nature/post`, configGetPublic);
      const imagePosts = await res.json();
      if (imagePosts.data) {
        const image: PostType =
          imagePosts.data[Math.floor(Math.random() * imagePosts.data.length)];
        if (imagePost && imagePost !== singlePost.image) {
          setData({
            text: newText,
            image: image.image,
          });
        } else {
          setData({ text: newText, image: singlePost.image });
        }
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(closeNavbarMenu());
    fetchSinglePost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* ------------------------- fetching data ------------------------ */

  /* ------------------------ uploading data ----------------------- */

  const fetchUpdatePost = async (data: DataType | null) => {
    if (!data || !singlePost) return;
    setLoading(true);

    await axios({
      method: "put",
      url: URL_POST + singlePost.id,
      headers: header,
      data,
    })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Post updated!");
          dispatch(removeImagePost());
          dispatch(resetPosts());
          dispatch(closePostModal());
          setLoading(false);
          setEditText("");
          setSinglePost(null);
          setData(null);
          setTimeout(() => {
            router.reload();
          }, 1000);
        }
      })
      .catch((err) => console.log(ErrorIcon));
  };
  useEffect(() => {
    if (!data || !singlePost) return;
    if (data.text === singlePost.text && data.image === singlePost.image) {
      toast.error("You have not edit anything");
      return;
    } else {
      fetchUpdatePost(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleSubmit = async () => {
    if (!singlePost) return;
    let newText = singlePost.text;
    if (editText && editText != newText) {
      newText = editText;
    }
    fetchImage(newText);
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
              setData(null);
            }}
          />
        </div>
        <div className="h-full flex flex-col gap-2 ">
          <div>
            <h2 className="text-textLight text-xl font-bold w-full text-center">
              Edit post
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
              <hr className="w-full my-5 border-b border-primaryMedium" />
            </div>
          </div>
          {!singlePost && <LoadingSpinner />}
          {singlePost && (
            <div className="posting-form-image">
              <div>
                {loading && <LoadingSpinner />}
                {!loading && (
                  <textarea
                    rows={4}
                    value={editText || ""}
                    placeholder={`what's on your mind,  ${mainProfile.firstName} ?`}
                    className={
                      imagePost ? "text-area-modal text-sm" : "text-area-modal "
                    }
                    onChange={(e: any) => {
                      setEditText(e.target.value);
                    }}
                  />
                )}
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
                className=" bg-accentMain h-10 text-textLight flex  hover:bg-accentDark rounded-md transition-all relative  justify-center items-center  text-sm font-medium gap-2 p-3 my-2 text-center w-full"
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

export default ModalEdit;
