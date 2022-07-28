import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "../../app/hooks";
import MainLeftSidebar from "../../components/HomePage/MainLeftSidebar";

const Bookmarks = () => {
  const { mainProfile } = useAppSelector((state) => state.friend);

  const router = useRouter();

  useEffect(() => {
    toast.dismiss();
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
          <meta name="description" content="Your timeline homepage" />
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
