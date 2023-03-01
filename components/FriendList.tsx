import React from "react";
import { FriendType } from "../typing.d";
import Image from "next/image";
import LoadingSpinner from "./LoadingSpinner";
import { getDataMember } from "../util/getDataMember";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faGratipay } from "@fortawesome/free-brands-svg-icons";

type Props = {
  friendData: FriendType[];
  fetchMainProfile: (id: string) => Promise<void>;
};

const FriendList = ({ friendData, fetchMainProfile }: Props) => {
  return (
    <main className="welcome-container">
      <div className="welcome-content">
        <div className="welcome-header sticky">
          <h2 className="welcome-header-title">
            Welcome to AzriClone by Riza Hariati
          </h2>
          <h3 className="text-center leading-5 mt-2">
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
          <div className="welcome-card-container">
            {friendData
              .sort(() => Math.random() - 0.5)
              .map((friend: FriendType, index: number) => {
                const { month, member, location } = getDataMember(index);
                return (
                  <button
                    key={friend.id}
                    className="welcome-card"
                    onClick={() => fetchMainProfile(friend.id)}
                  >
                    <div className="welcome-img ">
                      <Image
                        loading="lazy"
                        src={friend.picture}
                        alt={friend.firstName}
                        width={80}
                        height={80}
                        layout="responsive"
                        className="img-base rounded-full z-20 shadow-md  bg-primaryMediumLight transition-all"
                      />
                      <div className=" bg-accentMain img-base absolute -top-2 right-1 w-16 h-16 sm:w-20 sm:h-20 z-10 rounded-full "></div>
                    </div>
                    <div className=" h-full w-full col-start-4 col-span-9 ">
                      <h4 className="text-textMedium font-normal font-headerFont text-lg mb-2">{`${
                        friend.firstName + " " + friend.lastName
                      }`}</h4>
                      <div>
                        <div className="text-base text-textDark grid grid-cols-12 gap-1 mb-1 leading-5">
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className=" col-span-2 text-lg"
                          />

                          <p className="col-span-10"> {location}</p>
                        </div>
                        <div className="text-base text-textDark grid grid-cols-12 mb-1 leading-5">
                          <FontAwesomeIcon
                            icon={faGratipay}
                            className="col-span-2 text-base pt-1"
                          />

                          <p className=" col-span-10">
                            Member since : {`${month} ${member}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
          </div>
        )}
      </div>
    </main>
  );
};

export default FriendList;
