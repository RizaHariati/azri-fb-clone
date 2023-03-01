import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch } from "../app/hooks";
import { resetFriend, setMainProfile } from "../app/store/friend";
import { closeNavbarMenu, resetPosts, setStories } from "../app/store/post";
import { resetProfile } from "../app/store/profile";
import FriendList from "../components/FriendList";
import LoadingSpinner from "../components/LoadingSpinner";
import { FriendType, PostType } from "../typing.d";
import {
  configGet,
  configGetPublic,
  URL_POST,
  URL_USER,
} from "../util/configAPI";

interface Props {
  friendData: FriendType[];
  stories: PostType[];
}
const description =
  "A clone of Facebook using Next.JS, Typescript as the core of this web design with the help of Redux/toolkit, Redux/persist and Next Redux Wrapper. For styling I use FontAwesome Icons and Tailwind CSS";

const Welcome = ({ friendData, stories }: Props) => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<FriendType | null>(null);

  const fetchMainProfile = async (id: string) => {
    try {
      const res = await fetch(URL_USER + id, configGetPublic);
      const profiledata = await res.json();

      if (profiledata) {
        const randomNumber = Math.floor(Math.random() * 5);
        const { id, title, firstName, lastName, picture } = profiledata;
        const profile: FriendType = { id, title, firstName, lastName, picture };

        setUser(profile);
        dispatch(resetFriend());
        dispatch(resetPosts());
        dispatch(resetProfile());
        dispatch(setMainProfile(profile));
        dispatch(setStories({ stories, randomNumber }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    toast.dismiss();
    dispatch(closeNavbarMenu());
    if (user) {
      route.push("/main/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (user) {
    return (
      <div className="main-container">
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <title>AzriClone || Loading {user.firstName}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={process.env.GOOGLE_KEY} />
          <meta property="og:image" content="/images/azriclone.png" />

          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="main-left-sidebar"></div>
        <div className="main-content">
          <LoadingSpinner />
        </div>
        <div className="main-right-sidebar "></div>
      </div>
    );
  } else {
    return (
      <div className=" bg-primaryDark">
        <Head>
          <title>AzriClone || Welcome</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={process.env.OOGLE_KEY} />
          <meta property="og:image" content="/images/azriclone.png" />

          <link rel="icon" href="/favicon.ico" />
        </Head>
        <FriendList
          friendData={friendData}
          fetchMainProfile={fetchMainProfile}
        />
      </div>
    );
  }
};

export default Welcome;

export const getStaticProps = async () => {
  const responseFriend = await fetch(URL_USER + "?page=" + 1, configGet);
  const friend = await responseFriend.json();
  /* ------------------------- getting story ------------------------ */

  const responseStory = await fetch(
    URL_POST + "?page=" + 0 + "&limit=15",
    configGet
  );
  const story = await responseStory.json();

  if (friend.data && story.data) {
    return {
      props: {
        friendData: friend.data,
        stories: story.data,
      },
    };
  } else {
    return { notFound: true };
  }
};
