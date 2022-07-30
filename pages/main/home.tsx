import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setFriendData } from "../../app/store/friend";
import { addMorePosts, closeNavbarMenu } from "../../app/store/post";
import MainContent from "../../components/HomePage/MainContent";
import MainLeftSidebar from "../../components/HomePage/MainLeftSidebar";
import MainRightSidebar from "../../components/HomePage/MainRightSidebar";
import { FriendType } from "../../typing.d";
import { configGet, URL_POST, URL_USER } from "../../util/configAPI";

interface Props {
  friends: FriendType[];
}

const Home = ({ friends }: Props) => {
  const { mainProfile } = useAppSelector((state) => state.friend);
  const { page } = useAppSelector((state) => state.post);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    /* ---------------------- getting main posts ---------------------- */

    const responsePost = await fetch(
      URL_POST + "?page=" + page + "&limit=5",
      configGet
    );
    const post = await responsePost.json();
    if (post.data) dispatch(addMorePosts(post.data));
  };

  useEffect(() => {
    toast.dismiss();
    dispatch(closeNavbarMenu());
    if (mainProfile?.id === "") {
      router.push("/");
    } else {
      fetchData();
      dispatch(setFriendData(friends));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const randomNumber = Math.floor(Math.random() * 2);
  const responseFriend = await fetch(
    URL_USER + "?page=" + randomNumber,
    configGet
  );
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
