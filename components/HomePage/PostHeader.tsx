import {
  faEdit,
  faRectangleXmark,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import {
  faCircle,
  faEllipsis,
  faGlobeAsia,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addToHiddenPost, resetPosts } from "../../app/store/post";
import { hideProfilePost } from "../../app/store/profile";
import {
  closePostDetail,
  closePostModal,
  openPostModal,
  setPostDetail,
  setPostModalID,
} from "../../app/store/tool";
import { FriendType, PostType } from "../../typing.d";
import IconRoundTextBtn from "../Buttons/IconRoundTextBtn";
import LinkImgBtn from "../Buttons/LinkImgBtn";
import Confirming from "../navbar/modals/Confirming";
// import TimeAgo from "react-timeago";

const URL_POST = "https://dummyapi.io/data/v1/post/";
const configDelete = {
  method: "DELETE",
  headers: { "app-id": process.env.KEYWORD_API || "key" },
};

interface HeaderProps {
  owner: FriendType;
  published: string;
  postID: string;
  setMainPosts?: React.Dispatch<React.SetStateAction<PostType[]>>;
  setProfilePostsState?: React.Dispatch<React.SetStateAction<PostType[]>>;
  setGuestPostsState?: React.Dispatch<React.SetStateAction<PostType[]>>;
}

/* ---------------------------------------------------------------- */
/*                           Main Function                          */
/* ---------------------------------------------------------------- */

const PostHeader = ({
  owner,
  published,
  postID,
  setMainPosts,
  setProfilePostsState,
}: HeaderProps) => {
  const mainProfile: FriendType = useAppSelector(
    (state) => state.friend.mainProfile
  );

  const postDetail: string = useAppSelector((state) => state.tool.postDetail);
  const posts: PostType[] = useAppSelector((state) => state.post.posts);
  const { mainProfilePosts } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const date = moment(published).format("LL");
  const handleDelete = async (postID: string, tId: string) => {
    toast.dismiss(tId);
    dispatch(closePostDetail());
    try {
      const res = await fetch(URL_POST + postID, configDelete);
      const data = await res.json();
      if (data.id && data.id === postID) {
        const filteredPost = posts.filter((post) => post.id !== postID);
        const filterMainProfilePosts = mainProfilePosts.filter(
          (post) => post.id !== postID
        );

        setMainPosts ? setMainPosts(filteredPost) : null;
        setProfilePostsState
          ? setProfilePostsState(filterMainProfilePosts)
          : null;

        toast.success("Post Deleted");
        // router.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleHide = async (postID: string, tId: string) => {
    toast.dismiss(tId);
    dispatch(addToHiddenPost(postID));
    dispatch(hideProfilePost(postID));
    const filteredPost = posts.filter((post) => post.id !== postID);

    setMainPosts ? setMainPosts(filteredPost) : null;
    toast.success("Post Hidden");
    dispatch(closePostDetail());
  };

  const handlePost = async (postID: string, ownerId: string, text: string) => {
    if (text === "Delete") {
      if (ownerId === mainProfile?.id) {
        return toast.custom((t) => (
          <Confirming
            t={t}
            postID={postID}
            alertType="Delete"
            handleClick={handleDelete}
            alertText=" Delete Post? This can not be undone"
          />
        ));
      } else {
        dispatch(closePostDetail());
      }
    } else if (text === "Hide") {
      toast.custom((t) => (
        <Confirming
          t={t}
          postID={postID}
          alertType="Hide"
          handleClick={handleHide}
          alertText="Hide Post? You will not see this post in your timeline anymore"
        />
      ));
    } else if (text === "Edit") {
      if (ownerId === mainProfile?.id) {
        dispatch(openPostModal("Edit"));
        dispatch(setPostModalID(postID));
        dispatch(closePostDetail());
      } else {
        dispatch(closePostModal());
        dispatch(closePostDetail());
      }
    } else {
      dispatch(closePostModal());
      dispatch(closePostDetail());
    }
  };

  return (
    <div className="grid grid-cols-9 gap-2 px-3 md:px-5 ">
      <div className="col-span-8 flex items-center gap-2">
        <LinkImgBtn
          src={owner.picture}
          href={`/profile/${owner.id}`}
          imgClass="img-icon m-0 p-0"
        />

        <div className=" col-span-7 col-start-3 text-textMedium text-sm font-medium cursor-pointer hover:underline-offset-2 underline-offset-auto ">
          <h4>{`${owner.firstName} ${owner.lastName}`}</h4>

          <p className="flex gap-2 items-center text-textDark text-xs">
            {date}
            <FontAwesomeIcon icon={faCircle} style={{ fontSize: "3px" }} />
            <FontAwesomeIcon icon={faGlobeAsia} className="text-xs" />
          </p>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => {
            dispatch(setPostDetail(postID));
          }}
          className="icon-btn bg-secondaryMedium hover:bg-primaryMedium"
        >
          <FontAwesomeIcon icon={faEllipsis} className="text-xl" />
        </button>
        {postDetail === postID && (
          <div className="absolute w-52 h-fit bg-secondaryMedium rounded-md right-0 z-10 p-3">
            {mainProfile?.id === owner.id && (
              <>
                <IconRoundTextBtn
                  onClick={() => {
                    handlePost(postID, owner.id, "Delete");
                  }}
                  text="Delete Post"
                  icon={faTrashCan}
                />
                <IconRoundTextBtn
                  onClick={() => {
                    handlePost(postID, owner.id, "Edit");
                  }}
                  text="Edit Post"
                  icon={faEdit}
                />
                {/* <hr className="w-full my-3 border-b border-primaryMediumLight" /> */}
              </>
            )}
            {mainProfile?.id !== owner.id && (
              <IconRoundTextBtn
                onClick={() => {
                  handlePost(postID, owner.id, "Hide");
                }}
                text="Hide Post"
                icon={faRectangleXmark}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default PostHeader;
