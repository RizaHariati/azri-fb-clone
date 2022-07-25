import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import LoadingSpinner from "../../components/LoadingSpinner";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileLeft from "../../components/Profile/ProfileLeftSide";
import ProfilePost from "../../components/Profile/ProfilePost";
import { FriendType, FullProfileType, PostType } from "../../typing.d";
const URL_USER = "https://dummyapi.io/data/v1/user/";
const config = {
  method: "GET",
  headers: { "app-id": process.env.KEYWORD_API || "" },
};

interface Props {
  guestPost: PostType[];
  guestProfile: FullProfileType;
}
const Profile = ({ guestPost, guestProfile }: Props) => {
  const ref: React.LegacyRef<HTMLDivElement> = useRef(null);
  const [fixHeaderBar, setFixHeaderBar] = useState<boolean>(true);
  const router = useRouter();
  const { friendList } = useAppSelector((state) => state.friend);

  const setProfileHeader = () => {
    if (window.scrollY < window.innerHeight - 100) {
      setFixHeaderBar(true);
    } else {
      setFixHeaderBar(false);
    }
  };
  window.addEventListener("scroll", setProfileHeader);
  if (router.isFallback) {
    return (
      <main className="h-fit w-full scroll-smooth">
        <LoadingSpinner />
      </main>
    );
  }

  if (friendList && friendList.length > 1) {
    return (
      <div>
        <Head>
          <title>
            AzriClone || {guestProfile.firstName} {guestProfile.lastName}
          </title>
          <meta name="description" content="Your timeline homepage" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="h-fit w-full scroll-smooth">
          {/* ------------------------ profile header ------------------------ */}
          <div ref={ref} className="h-fit">
            <ProfileHeader
              fixHeaderBar={fixHeaderBar}
              friendList={friendList}
              profile={guestProfile}
              randomNumber={Math.floor(Math.random() * 1000)}
              post={guestPost[3]}
              classAddition="to-sky-600"
            />
          </div>
          {/* ------------------------- profile body ------------------------- */}
          <div className="h-fit w-full max-w-4xl bg-primaryDark grid mx-auto grid-cols-1 md:grid-cols-5 grid-rows-2   last:md:grid-rows-1  box-border">
            {/* ------------------------- profile left ------------------------- */}

            <ProfileLeft fullProfile={guestProfile} profilePosts={guestPost} />

            {/* ------------------------- profile right   ---------------------- */}
            <div className="profile-right ">
              {/* <PostingForm /> */}
              <ProfilePost profilePost={guestPost} />
            </div>
          </div>
        </main>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Profile;

export const getStaticPaths: GetStaticPaths = async () => {
  const responseFriend = await fetch(URL_USER, config);
  const friend = await responseFriend.json();
  let friendPaths = [{ params: {} }];
  if (friend.data) {
    friendPaths = friend.data.map((item: FriendType) => ({
      params: { id: item.id },
    }));
  }
  return {
    paths: friendPaths,
    fallback: true,
  };
};
export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const id = context.params?.id;
    const res = await fetch(URL_USER + id + "/post", config);
    const guestPosts = await res.json();

    const resUser = await fetch(URL_USER + id, config);
    const guestProfile = await resUser.json();
    if (guestPosts.data && guestProfile) {
      return {
        props: {
          guestPost: guestPosts.data,
          guestProfile: guestProfile,
        },
      };
    } else {
      return { notFound: true };
    }
  } catch (error) {
    return { notFound: true };
  }
};