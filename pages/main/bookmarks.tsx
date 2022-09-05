import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeNavbarMenu } from "../../app/store/post";
import MainLeftSidebar from "../../components/HomePage/MainLeftSidebar";

const description =
  "A clone of Facebook using Next.JS, Typescript as the core of this web design with the help of Redux/toolkit, Redux/persist and Next Redux Wrapper. For styling I use FontAwesome Icons and Tailwind CSS";

const Bookmarks = () => {
  const { mainProfile } = useAppSelector((state) => state.friend);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    toast.dismiss();

    dispatch(closeNavbarMenu());

    if (mainProfile?.id === "") {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainProfile]);

  if (mainProfile?.id === "") return <div></div>;
  else {
    return (
      <div>
        <Head>
          <title>AzriClone || Bookmarks</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={process.env.GOOGLE_KEY} />
          <meta name="og:image" content="/images/azriclone.png" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="bookmarks-container ">
          <MainLeftSidebar leftClass="bookmarks-leftSideBar" />
          <div></div>
          <div></div>
        </main>
      </div>
    );
  }
};

export default Bookmarks;
