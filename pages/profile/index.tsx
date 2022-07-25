import Head from "next/head";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setMainFullProfile,
  setMainProfilePost,
} from "../../app/store/profile";
import MainPosts from "../../components/HomePage/MainPosts";
import PostingForm from "../../components/HomePage/PostingForm";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileLeft from "../../components/Profile/ProfileLeftSide";
import ProfilePost from "../../components/Profile/ProfilePost";
import { FullProfileType, PostType } from "../../typing.d";
import postIDExist from "../../util/postExist";
const URL_USER = "https://dummyapi.io/data/v1/user/";
const config = {
  method: "GET",
  headers: { "app-id": process.env.KEYWORD_API || "" },
};

const MainProfile = () => {
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
    } else {
      setFixHeaderBar(false);
    }
  };
  window.addEventListener("scroll", setProfileHeader);

  useEffect(() => {
    if (mainProfile?.id === "") {
      router.push("/");
    } else {
      fetchMainProfile(mainProfile.id);
    }
  }, [mainProfile]);

  const fetchMainProfile = async (id: string) => {
    const res = await fetch(URL_USER + id + "/post", config);
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

      dispatch(setMainProfilePost(mainProfilePostFiltered));
    }
    const resUser = await fetch(URL_USER + id, config);
    const mainFullProfile = await resUser.json();
    if (mainFullProfile) dispatch(setMainFullProfile(mainFullProfile));
  };

  if (mainProfile?.id === "") return <div></div>;
  else {
    return (
      <div className="bg-primaryDark">
        <Head>
          <title>
            AzriClone || {mainProfile.firstName} {mainProfile.lastName}
          </title>
          <meta name="description" content="Your timeline homepage" />
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
          <div className="h-fit w-full max-w-4xl bg-primaryDark grid mx-auto grid-cols-1 md:grid-cols-5 grid-rows-2   last:md:grid-rows-1 ">
            {/* ------------------------- profile left ------------------------- */}

            <ProfileLeft
              fullProfile={fullProfile}
              profilePosts={mainProfilePosts}
            />

            {/* ------------------------- profile right   ---------------------- */}
            <div className="profile-right ">
              <PostingForm />
              <ProfilePost profilePost={mainProfilePosts} />
            </div>
          </div>
        </main>
      </div>
    );
  }
};

export default MainProfile;
