import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeNavbarMenu } from "../../app/store/post";
import {
  setMainFullProfile,
  setMainProfilePost,
} from "../../app/store/profile";
import PostingForm from "../../components/HomePage/PostingForm";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileLeft from "../../components/Profile/ProfileLeftSide";
import ProfilePost from "../../components/Profile/ProfilePost";
import { FullProfileType, PostType } from "../../typing.d";
import { configGet, URL_USER } from "../../util/configAPI";
import postIDExist from "../../util/postExist";

const description =
  "Friend page from AzriClone showing the friends that interact with you the most";
const MainProfile = () => {
  const [profilePostsState, setProfilePostsState] = useState<PostType[]>([]);
  const ref: React.LegacyRef<HTMLDivElement> = useRef(null);
  const { friendList, mainProfile, randomNumber } = useAppSelector(
    (state) => state.friend
  );
  const fullProfile: FullProfileType = useAppSelector(
    (state) => state.profile.fullProfile
  );
  const mainProfilePosts: PostType[] = useAppSelector(
    (state) => state.profile.mainProfilePosts
  );
  const hiddenPost: string[] = useAppSelector((state) => state.post.hiddenPost);
  const [fixHeaderBar, setFixHeaderBar] = useState<boolean>(true);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const setProfileHeader = () => {
    if (window.scrollY < window.innerHeight - 100) {
      setFixHeaderBar(true);
      dispatch(closeNavbarMenu());
    } else {
      setFixHeaderBar(false);
    }
  };
  window.addEventListener("scroll", setProfileHeader);

  useEffect(() => {
    toast.dismiss();
    if (mainProfile?.id === "") {
      router.push("/");
    } else {
      fetchMainProfile(mainProfile.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainProfile]);

  const fetchMainProfile = async (id: string) => {
    const res = await fetch(URL_USER + id + "/post", configGet);
    const mainprofilePosts = await res.json();
    if (mainprofilePosts.data) {
      const mainProfilePostFiltered = mainprofilePosts.data.filter(
        (post: PostType) => {
          if (postIDExist(hiddenPost, post.id)) {
            return false;
          } else {
            return true;
          }
        }
      );
      setProfilePostsState(mainProfilePostFiltered);
      dispatch(setMainProfilePost(mainProfilePostFiltered));
    }
    const resUser = await fetch(URL_USER + id, configGet);
    const mainFullProfile = await resUser.json();
    if (mainFullProfile) dispatch(setMainFullProfile(mainFullProfile));
  };

  if (mainProfile?.id === "")
    return (
      <div>
        <Head>
          <title>AzriClone || Loading...</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={process.env.GOOGLE_KEY} />
          <meta name="og:image" content="/images/azrifriend.png" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
    );
  else {
    return (
      <div className="bg-primaryDark">
        <Head>
          <title>
            AzriClone || {mainProfile.firstName} {mainProfile.lastName}
          </title>
          <meta name="description" content={description} />
          <meta name="keywords" content={process.env.GOOGLE_KEY} />
          <meta name="og:image" content="/images/azrifriend.png" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="h-fit w-full scroll-smooth">
          {/* ------------------------ profile header ------------------------ */}
          <div ref={ref} className="">
            <ProfileHeader
              fixHeaderBar={fixHeaderBar}
              friendList={friendList}
              profile={fullProfile}
              randomNumber={randomNumber}
              post={mainProfilePosts[3]}
              classAddition="to-accentDark"
            />
          </div>
          {/* ------------------------- profile body ------------------------- */}
          <div className="h-fit md:h-screen w-full max-w-4xl bg-primaryDark grid mx-auto grid-cols-1 md:grid-cols-5 grid-rows-1 :md:grid-rows-1 ">
            {/* ------------------------- profile left ------------------------- */}

            <ProfileLeft
              fullProfile={fullProfile}
              profilePosts={mainProfilePosts}
            />

            {/* ------------------------- profile right   ---------------------- */}
            <div className="profile-right ">
              <PostingForm />
              <ProfilePost
                profilePost={profilePostsState}
                setProfilePostsState={setProfilePostsState}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }
};

export default MainProfile;
