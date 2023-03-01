import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { persistor } from "../../app";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetFriend } from "../../app/store/friend";
import { handleOpenMenu, resetPosts } from "../../app/store/post";
import { resetProfile } from "../../app/store/profile";
import { resetTool } from "../../app/store/tool";
import SearchMenu from "./navBarDropMenu/SearchMenu";

const LogoSearch = () => {
  const { friendList } = useAppSelector((state) => state.friend);
  const { openMenu } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();
  if (friendList.length < 1) {
    return (
      <div className="logo-search-container ">
        <div className="logo-search">
          <SearchLogo />
        </div>
      </div>
    );
  } else {
    return (
      <div className="logo-search-container relative ">
        <div className="logo-search">
          {openMenu?.menuTitle !== "Search" && <SearchLogo />}

          {openMenu?.menuTitle === "Search" && (
            <button
              type="button"
              onClick={() => dispatch(handleOpenMenu("Search"))}
              className="search-button-arrow"
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="text-lg text-textMedium"
              />
            </button>
          )}
          <div className="search-form-navbar group ">
            <button
              onClick={(e: any) => {
                e.preventDefault();
                dispatch(handleOpenMenu("Search"));
              }}
              className="flex text-textDark bg-blue h-8 items-center gap-2 justify-start px-2 sm:px-3"
            >
              <FontAwesomeIcon icon={faSearch} />
              Search AzriClone
            </button>
          </div>
        </div>
        <SearchMenu />
      </div>
    );
  }
};

export default LogoSearch;

const SearchLogo = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleGoBackHome = () => {
    router.push("/");
    dispatch(resetFriend());
    dispatch(resetPosts());
    dispatch(resetProfile());
    dispatch(resetTool());
    persistor.flush();
    persistor.purge();
  };
  return (
    <button
      className="img-icon"
      onClick={() => {
        handleGoBackHome();
      }}
    >
      <Image
        priority
        src="/images/websiteImages/Logo.png"
        width={50}
        height={50}
        layout="responsive"
        className="img-base rounded-full"
        alt="Logo"
      />
      <p className="icon-note left-14 top-12 z-50 ">Select Account Page</p>
    </button>
  );
};
