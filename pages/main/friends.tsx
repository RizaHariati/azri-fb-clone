import { faGratipay } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeNavbarMenu } from "../../app/store/post";
import LoadingSpinner from "../../components/LoadingSpinner";
import { FriendType } from "../../typing.d";
import { configGet, URL_USER } from "../../util/configAPI";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface Props {
  friends: FriendType[];
}

const description =
  "Friend page from AzriClone showing the friends that interact with you the most";

const Friends = ({ friends }: Props) => {
  const { mainProfile } = useAppSelector((state) => state.friend);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    toast.dismiss();
    dispatch(closeNavbarMenu());
    if (mainProfile?.id === "") {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainProfile]);

  if (!friends || friends.length < 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-12 pt-14">
        <LoadingSpinner />;
      </div>
    );
  } else {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-12 pt-14 h-screen">
        <Head>
          <title>AzriClone || Friends</title>
          <meta name="description" content={description} />
          <meta name="image" content="/images/azrifriend.png" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="col-span-3 bg-primaryMediumDark h-full">
          <div className=" text-textPrimary flex text-2xl items-center gap-3 justify-start px-3 py-2 md:px-5 border-b border-primaryMedium cursor-pointer hover:bg-primaryMedium transition-all">
            <Link href="/main/home">
              <FontAwesomeIcon icon={faArrowLeft} />
            </Link>
            <h1>Home</h1>
          </div>
        </div>
        <div className="col-span-9 p-3 md:p-5">
          <div className="mb-3">
            <h2 className="text-textPrimary text-xl">Your Friends</h2>
          </div>
          <div className="grid grid-cols-12 gap-3 max-w-sm md:max-w-lg lg:max-w-2xl  mx-auto items-start">
            {friends
              .filter((friend: FriendType) => friend.id !== mainProfile.id)
              .map((friend: FriendType, index: number) => {
                const month = months[Math.floor(Math.random() * 11)];
                let location = "Jakarta, Indonesia";
                let member = 2010;
                if (index % 2 === 0) {
                  location = "Kuala Lumpur, Malaysia";
                  member = member + index / 2;
                }
                if (index % 3 === 0) {
                  location = "Perth, Australia";
                  member = member + index / 3;
                }
                if (member + index > 2022) {
                  member = 2022;
                }

                return (
                  <Link
                    href={`/profile/${friend.id}`}
                    key={friend.id}
                    className="mb-2 "
                  >
                    <div className=" col-span-6 md:col-span-4 lg:col-span-3 w-40 h-52 bg-primaryMediumDark rounded-md flex flex-col items-center justify-start text-textLight p-2 md:p-3 text-center cursor-pointer">
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-2">
                        <Image
                          width={60}
                          height={60}
                          layout="responsive"
                          src={friend.picture}
                          className="img-base rounded-full "
                          alt={friend.firstName}
                        />
                      </div>
                      <div>
                        <p className="text-Base leading-6 font-semibold">{`${
                          friend.firstName + " " + friend.lastName
                        }`}</p>
                        <p className="text-sm text-textDark leading-4">
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className="mr-2"
                          />
                          {location}
                        </p>
                        <p className="text-sm text-textDark leading-4">
                          <FontAwesomeIcon icon={faGratipay} className="mr-2" />
                          member since : {`${month} ${member}`}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
};

export default Friends;

export const getServerSideProps = async () => {
  /* ------------------------ getting friends ----------------------- */

  const randomNumber = Math.floor(Math.random() * 3);
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
