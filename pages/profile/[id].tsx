import { GetStaticProps, GetStaticPaths } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeNavbarMenu } from "../../app/store/post";
import { setGuestProfilePost } from "../../app/store/profile";
import LoadingSpinner from "../../components/LoadingSpinner";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileLeft from "../../components/Profile/ProfileLeftSide";
import ProfilePost from "../../components/Profile/ProfilePost";
import { FriendType, FullProfileType, PostType } from "../../typing.d";
import { configGet, URL_USER } from "../../util/configAPI";

interface Props {
  guestPost: PostType[];
  guestProfile: FullProfileType;
}

const description =
  "Friend page from AzriClone showing the friends that interact with you the most";

const Profile = ({ guestPost, guestProfile }: Props) => {
  const [guestPostsState, setGuestPostsState] = useState<PostType[]>(guestPost);
  const ref: React.LegacyRef<HTMLDivElement> = useRef(null);
  const [fixHeaderBar, setFixHeaderBar] = useState<boolean>(true);
  const router = useRouter();
  const { friendList } = useAppSelector((state) => state.friend);
  const dispatch = useAppDispatch();

  useEffect(() => {
    toast.dismiss();
    dispatch(setGuestProfilePost(guestPost));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setProfileHeader = () => {
    if (window.scrollY < window.innerHeight - 100) {
      setFixHeaderBar(true);
      dispatch(closeNavbarMenu());
    } else {
      setFixHeaderBar(false);
    }
  };
  window.addEventListener("scroll", setProfileHeader);

  if (router.isFallback) {
    return (
      <div>
        <Head>
          <title>AzriClone || Loading...</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={process.env.GOOGLE_KEY} />
          <meta property="og:image" content="/images/azrifriend.png" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="h-fit w-full scroll-smooth">
          <LoadingSpinner />
        </main>
      </div>
    );
  }

  if (friendList && friendList.length > 1) {
    return (
      <div>
        <Head>
          <title>
            AzriClone || {guestProfile.firstName} {guestProfile.lastName}
          </title>
          <meta name="description" content={description} />
          <meta name="keywords" content={process.env.GOOGLE_KEY} />
          <meta property="og:image" content="/images/azrifriend.png" />
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
          <div className="h-fit md:h-screen w-full max-w-4xl bg-primaryDark grid mx-auto grid-cols-1 md:grid-cols-5 grid-rows-1 :md:grid-rows-1 ">
            {/* ------------------------- profile left ------------------------- */}

            <ProfileLeft fullProfile={guestProfile} profilePosts={guestPost} />

            {/* ------------------------- profile right   ---------------------- */}
            <div className="profile-right ">
              {/* <PostingForm /> */}
              <ProfilePost
                profilePost={guestPostsState}
                setGuestPostsState={setGuestPostsState}
              />
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
  const responseFriend = await fetch(URL_USER, configGet);
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
  let loading = false;
  try {
    const id = context.params?.id;
    const res = await fetch(URL_USER + id + "/post", configGet);
    const guestPosts = await res.json();

    const resUser = await fetch(URL_USER + id, configGet);
    const guestProfile = await resUser.json();
    if (guestPosts.data && guestProfile) {
      return {
        props: {
          guestPost: guestPosts.data,
          guestProfile: guestProfile,
          loading,
        },
      };
    } else {
      return { notFound: true };
    }
  } catch (error) {
    return { notFound: true };
  }
};
