import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { store, wrapper } from "../app";
import { useAppDispatch } from "../app/hooks";
import {
  resetFriend,
  setFriendData,
  setMainProfile,
} from "../app/store/friend";
import { resetPosts } from "../app/store/post";
import { resetProfile } from "../app/store/profile";
import { FriendType } from "../typing.d";
const URL_USER = "https://dummyapi.io/data/v1/user/";
const config = {
  method: "GET",
  headers: { "app-id": process.env.KEYWORD_API || "" },
};

interface Props {
  friendData: FriendType[];
}
const Welcome = ({ friendData }: Props) => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const fetchMainProfile = async (id: string) => {
    try {
      const res = await fetch(URL_USER + id, config);
      const profiledata = await res.json();
      if (profiledata) {
        const { id, title, firstName, lastName, picture } = profiledata;
        dispatch(resetFriend());
        dispatch(resetPosts());
        dispatch(resetProfile());
        dispatch(setMainProfile({ id, title, firstName, lastName, picture }));

        setTimeout(() => {
          route.push("/main/home");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Head>
        <title>AzriClone || Welcome</title>
        <meta
          name="description"
          content="Welcome to AzriFBClone, Pick your account"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main-container">
        <div className="main-left-sidebar"></div>
        <div className="main-content">
          <div className="flex flex-col items-center justify-center text-xl mb-5 ">
            <h3>
              Welcome to{" "}
              <span className=" text-accentMain hover:text-accentDark transition-all font-semibold">
                {" "}
                AzriClone
              </span>
            </h3>
            <h3 className="text-center">
              A clone of Facebook using fake data from{" "}
              <a
                href="https://dummyapi.io/"
                className=" underline underline-offset-4 text-textMedium"
              >
                dummyapi.io
              </a>
            </h3>
            <h3>Please pick your account</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 p-5 px-10 sm:px-5 gap-x-10 border-l border-r border-primaryMediumLight">
            {friendData.map((friend: FriendType) => {
              return (
                <button
                  key={friend.id}
                  className="icon-round-text-btn-lg border-b sm:border-none rounded-none sm:rounded-md border-r-primaryMediumDark"
                  onClick={() => fetchMainProfile(friend.id)}
                >
                  <div className="img-icon">
                    <Image
                      src={friend.picture}
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
        </div>
        <div className="main-right-sidebar "></div>
      </main>
    </div>
  );
};

export default Welcome;

export const getStaticProps = async () => {
  const responseFriend = await fetch(URL_USER, config);
  const friend = await responseFriend.json();

  return {
    props: {
      friendData: friend.data,
    },
  };
};
