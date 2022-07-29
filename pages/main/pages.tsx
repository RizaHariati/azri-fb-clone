import { faGratipay } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeNavbarMenu } from "../../app/store/post";
import { mainShortcuts } from "../../data/main-data";

type ShortcutType = {
  id: string;
  name: string;
  url: string;
  link: string;
  text: string;
};
const Friends = () => {
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 pt-14 h-screen">
      <div className="col-span-3 bg-primaryMediumDark h-14 md:h-full">
        <div className=" text-textPrimary flex text-2xl items-center gap-3 justify-start px-3 py-2 md:px-5 border-b border-primaryMedium cursor-pointer hover:bg-primaryMedium transition-all">
          <Link href="/main/home">
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
          <h1>Home</h1>
        </div>
      </div>
      <div className="col-span-9 p-3 md:p-5">
        <div className="mb-3">
          <h2 className="text-textPrimary text-xl">Your Pages</h2>
        </div>
        <div className="flex flex-col max-w-2xl items-start justify-start mx-auto gap-3 w-full">
          {mainShortcuts.map((shortcut: ShortcutType, index: number) => {
            return (
              <a
                href={shortcut.link}
                key={index}
                className="bg-primaryMediumDark p-3 flex gap-3 hover:bg-primaryMedium transition-all w-full "
              >
                <div className="w-12 h-12 rounded-full">
                  <Image
                    src={`/images/pagesImages/${shortcut.url}.png`}
                    width={60}
                    height={60}
                    layout="responsive"
                    className="img-base rounded-full"
                    alt={shortcut.name}
                  />
                </div>
                <div>
                  <h2 className="text-textLight">{shortcut.name}</h2>
                  <p className="text-textMedium text-xs">{shortcut.text}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Friends;
