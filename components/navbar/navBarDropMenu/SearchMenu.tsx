import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { closeNavbarMenu, handleOpenMenu } from "../../../app/store/post";
import { FriendType } from "../../../typing.d";

export type LinkLeft = {
  link: string;
  icon: IconProp;
  text: string;
  color: string;
};

export type MainMenuLeft = {
  id: string;
  title: string;
  links: LinkLeft[];
};

const SearchMenu = () => {
  const { friendList } = useAppSelector((state) => state.friend);
  const { openMenu } = useAppSelector((state) => state.post);
  const [text, setText] = useState("");
  const [friends, setFriends] = useState<FriendType[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (friendList) {
      setFriends(friendList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friendList]);

  useEffect(() => {
    if (text) {
      const newFriends = friendList.filter(
        (friend: FriendType) =>
          friend.firstName.toLowerCase().includes(text.toLowerCase()) ||
          friend.lastName.toLowerCase().includes(text.toLowerCase())
      );
      setFriends(newFriends);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    dispatch(closeNavbarMenu());
    setFriends(friendList);
    setText("");
  };
  return (
    <div
      className={
        openMenu?.menuTitle === "Search"
          ? `search-menu`
          : `search-menu h-0 opacity-40 z-0`
      }
    >
      <div>
        <div className="search-form-container">
          {openMenu?.menuTitle === "Search" && (
            <button
              type="button"
              onClick={() => dispatch(handleOpenMenu("Search"))}
              className="search-button-arrow"
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="text-lg text-textDark"
              />
            </button>
          )}
          <form
            className="search-form group "
            onSubmit={(e: ChangeEvent<HTMLFormElement>) => {
              handleSubmit(e);
            }}
          >
            <button
              className="search-button-magnify"
              onClick={(e: any) => {
                e.preventDefault();
                dispatch(handleOpenMenu("Search"));
              }}
            >
              <FontAwesomeIcon
                icon={faSearch}
                className="text-lg text-textDark"
              />
            </button>
            <input
              autoComplete="false"
              value={text}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleSearch(e);
              }}
              type="text"
              placeholder="Search AzriClone"
              className="search-input"
            />
          </form>
        </div>
        {!text && (
          <h3 className=" text-textLight text-xl font-semibold py-5 px-2 sm:px-5">
            Search Friend
          </h3>
        )}

        {/* ----------------------- friendlist result ---------------------- */}
        <div className="px-4">
          {text && friends.length < 1 && (
            <h3 className=" text-textLight text-xl font-semibold py-5 px-2 sm:px-5">
              Friends not found
            </h3>
          )}
          {text &&
            friends.length > 0 &&
            friends.map((friend: FriendType) => {
              return (
                <Link href={`/profile/${friend.id}`} key={friend.id}>
                  <div
                    onClick={() => {
                      dispatch(closeNavbarMenu());
                      setFriends(friendList);
                      setText("");
                    }}
                    className="flex items-center justify-start gap-2 mb-3 cursor-pointer"
                  >
                    <div className={"img-icon-small"}>
                      <Image
                        src={friend.picture}
                        width={30}
                        height={30}
                        layout="responsive"
                        className="img-base rounded-full"
                        alt={friend.lastName}
                      />
                    </div>
                    <p className="text-textMedium font-normal">
                      {friend.firstName} {friend.lastName}
                    </p>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SearchMenu;
