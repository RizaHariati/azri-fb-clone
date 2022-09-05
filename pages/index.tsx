import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppDispatch } from "../app/hooks";
import { resetFriend, setMainProfile } from "../app/store/friend";
import { closeNavbarMenu, resetPosts, setStories } from "../app/store/post";
import { resetProfile } from "../app/store/profile";
import LoadingSpinner from "../components/LoadingSpinner";
import { FriendType, PostType } from "../typing.d";
import { configGet, URL_POST, URL_USER } from "../util/configAPI";

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
      const res = await fetch(URL_USER + id, configGet);
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
          <title>AzriClone || Loading {user.firstName}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={process.env.GOOGLE_KEY} />
          <meta name="image" content="/images/azriclone.png" />
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
      <div>
        <Head>
          <title>AzriClone || Welcome</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={process.env.GOOGLE_KEY} />
          <meta name="image" content="/images/azriclone.png" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="main-container">
          <div className="main-left-sidebar"></div>
          <div className="main-content">
            <div className="flex flex-col items-center justify-center text-lg md:text-xl mt-5  w-full px-3">
              <h2 className=" text-accentMain hover:text-accentDark transition-all font-semibold text-2xl cursor-pointer">
                Welcome to AzriClone
              </h2>
              <h3 className="text-center">
                A clone of Facebook using fake data from &nbsp;
                <a
                  href="https://dummyapi.io/"
                  className=" underline underline-offset-4 text-textMedium"
                >
                  dummyapi.io
                </a>
              </h3>
              <h3>Please pick your account</h3>
            </div>
            {!friendData && (
              <div>
                <LoadingSpinner />
              </div>
            )}
            {friendData && friendData.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 p-5 px-10 sm:px-5 gap-x-10 border-l border-r border-primaryMediumLight">
                {friendData
                  .sort(() => Math.random() - 0.5)
                  .map((friend: FriendType) => {
                    return (
                      <button
                        key={friend.id}
                        className="icon-round-text-btn-lg border-b sm:border-none rounded-none md:rounded-md border-primaryMedium"
                        onClick={() => fetchMainProfile(friend.id)}
                      >
                        <div className="img-icon w-8 h-8 overflow-hidden">
                          <Image
                            src={friend.picture}
                            alt={friend.firstName}
                            width={30}
                            height={30}
                            layout="responsive"
                            className="img-base rounded-full"
                          />
                        </div>
                        <p className="text-textMedium font-normal">{`${
                          friend.firstName + " " + friend.lastName
                        }`}</p>
                      </button>
                    );
                  })}
              </div>
            )}
          </div>
          <div className="main-right-sidebar "></div>
        </main>
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
