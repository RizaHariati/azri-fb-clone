import Head from "next/head";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setMainFullProfile,
  setMainProfilePost,
} from "../../app/store/profile";
import PostingForm from "../../components/HomePage/PostingForm";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileLeft from "../../components/Profile/ProfileLeftSide";
import ProfilePost from "../../components/Profile/ProfilePost";
import { FullProfileType, PostType } from "../../typing.d";
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
  const [fixHeaderBar, setFixHeaderBar] = useState<boolean>(true);
  const [position, setPosition] = useState(0);
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (mainProfile?.id === "") {
      router.push("/");
    } else {
      fetchMainProfile(mainProfile.id);
    }
  }, [mainProfile]);

  const handleScroll = (e: ChangeEvent) => {
    let current = e.currentTarget.getClientRects()[0].y || 0;
    setPosition(current);
    const height = ref.current?.clientHeight || 0;
    if (current < position && current < -380) {
      setFixHeaderBar(false);
    } else if (current > position && Math.abs(current) < height) {
      setFixHeaderBar(true);
    }
  };

  const fetchMainProfile = async (id: string) => {
    const res = await fetch(URL_USER + id + "/post", config);
    const mainprofilePosts = await res.json();
    if (mainprofilePosts.data) {
      dispatch(setMainProfilePost(mainprofilePosts.data));
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
        <main
          className="h-fit w-full scroll-smooth"
          onWheelCapture={(e: any) => handleScroll(e)}
        >
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
