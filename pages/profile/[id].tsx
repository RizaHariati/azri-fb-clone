import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ChangeEvent, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
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
  const [position, setPosition] = useState(0);

  const { friendList } = useAppSelector((state) => state.friend);

  const handleScroll = (e: ChangeEvent) => {
    let current = e.currentTarget.parentElement?.getClientRects()[0].y || 0;
    setPosition(current);
    const height = ref.current?.clientHeight || 0;
    if (current < position && current < -380) {
      setFixHeaderBar(false);
    } else if (current > position && Math.abs(current) < height) {
      setFixHeaderBar(true);
    }
  };

  return (
    <div>
      <Head>
        <title>
          AzriClone || {guestProfile.firstName} {guestProfile.lastName}
        </title>
        <meta name="description" content="Your timeline homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="h-fit w-full scroll-smooth"
        onWheelCapture={(e: any) => handleScroll(e)}
      >
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
  console.log(friendPaths);
  return {
    paths: friendPaths,
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const res = await fetch(URL_USER + id + "/post", config);
  const guestPosts = await res.json();
  const resUser = await fetch(URL_USER + id, config);
  const guestProfile = await resUser.json();
  return {
    props: {
      guestPost: guestPosts.data,
      guestProfile: guestProfile,
    },
  };
};
