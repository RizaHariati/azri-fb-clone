import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { resetFriend } from "../../app/store/friend";
import { resetPosts } from "../../app/store/post";
import { resetProfile } from "../../app/store/profile";
import { resetTool } from "../../app/store/tool";

const LogoSearch = () => {
  const [openSearch, setopenSearch] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleGoBackHome = () => {
    router.push("/");
    dispatch(resetFriend());
    dispatch(resetPosts());
    dispatch(resetProfile());
    dispatch(resetTool());
  };
  return (
    <div className="logo-search-container ">
      <div className="logo-search">
        {!openSearch && (
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
            <p className="icon-note">Home</p>
          </button>
        )}

        {openSearch && (
          <button
            onClick={() => setopenSearch(false)}
            className="h-10 w-12 bg-transparent hover:bg-primaryMedium rounded-full"
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="text-lg text-textMedium"
            />
          </button>
        )}
        <form className="h-10 w-10 2xl:w-72 bg-primaryMedium flex items-center justify-start rounded-full overflow-clip transition-all relative outline-none group hover:bg-primaryMediumLight">
          <button className="icon-btn absolute group-hover:bg-primaryMediumLight group-focus-within:hidden">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <input
            autoComplete="false"
            onFocus={(e: any) => {
              e.preventDefault();
              setopenSearch(true);
            }}
            type="text"
            placeholder="Search AzriClone"
            className="absolute hidden 2xl:block left-10 h-full w-full group-focus-within:left-0 px-3 text-textMedium bg-transparent transition-all active:ring-0 active:bg-primaryMedium group-hover:bg-primaryMediumLight"
          />
        </form>
      </div>
    </div>
  );
};

export default LogoSearch;
