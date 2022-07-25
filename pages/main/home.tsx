import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setFriendData } from "../../app/store/friend";
import { addMorePosts, setStories } from "../../app/store/post";
import MainContent from "../../components/HomePage/MainContent";
import MainLeftSidebar from "../../components/HomePage/MainLeftSidebar";
import MainRightSidebar from "../../components/HomePage/MainRightSidebar";
import { FriendType } from "../../typing.d";

const URL_USER = "https://dummyapi.io/data/v1/user?";
const URL_POST = "https://dummyapi.io/data/v1/post?";

const config = {
  method: "GET",
  headers: { "app-id": process.env.KEYWORD_API || "" },
};

interface Props {
  friends: FriendType[];
}

const Home = ({ friends }: Props) => {
  const { mainProfile } = useAppSelector((state) => state.friend);
  const { storyPage, page } = useAppSelector((state) => state.post);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    /* ------------------------- getting story ------------------------ */

    const responseStory = await fetch(
      URL_POST + "page=" + storyPage + "&limit=5",
      config
    );
    const story = await responseStory.json();
    if (story.data) dispatch(setStories(story.data));
    /* ---------------------- getting main posts ---------------------- */

    const responsePost = await fetch(
      URL_POST + "page=" + page + "&limit=5",
      config
    );
    const post = await responsePost.json();
    if (post.data) dispatch(addMorePosts(post.data));
  };

  useEffect(() => {
    if (mainProfile?.id === "") {
      router.push("/");
    } else {
      fetchData();
      dispatch(setFriendData(friends));
    }
  }, [mainProfile]);

  if (mainProfile?.id === "") return <div></div>;
  else {
    return (
      <div>
        <Head>
          <title>AzriClone || Home</title>
          <meta name="description" content="Your timeline homepage" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="main-container ">
          <MainLeftSidebar leftClass="main-left-sidebar" />
          <MainContent />
          <MainRightSidebar />
        </main>
      </div>
    );
  }
};

export default Home;

export const getServerSideProps = async () => {
  /* ------------------------ getting friends ----------------------- */

  const responseFriend = await fetch(URL_USER, config);
  const friend = await responseFriend.json();

  /* ----------------------- getting comments ----------------------- */

  if (friend.data) {
    return {
      props: {
        friends: friend.data,
      },
    };
  }
  return { notFound: true };
};