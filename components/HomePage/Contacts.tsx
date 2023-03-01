import { faGratipay } from "@fortawesome/free-brands-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { FriendType } from "../../typing.d";
import { getDataMember } from "../../util/getDataMember";

const Contacts = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 400,
    y: 400,
  });
  useEffect(() => {
    setPosition({
      x: window.outerWidth,
      y: window.outerHeight / 2,
    });
  }, []);

  const { friendList } = useAppSelector((state) => state.friend);
  const getPosition = (e: ChangeEvent) => {
    e.preventDefault();
    const parents =
      e.currentTarget.parentElement?.getClientRects()[0].left || 712;
    const child =
      e.currentTarget.parentElement?.getClientRects()[0].width || 400;
    const positionX = parents - child - 50;
    let positionY = e.target.getClientRects()[0].y;

    if (window.innerHeight - positionY < 100) {
      positionY = window.innerHeight - 100;
    }

    setPosition({ x: positionX, y: positionY });
  };
  const toggle = (id: string) => {
    if (openModal === id) {
      return setOpenModal(null);
    } else {
      setOpenModal(id);
    }
  };
  return (
    <div className="">
      <h4 className=" text-textDark font-semibold">Contacts</h4>
      {friendList.map((friend: FriendType, index: number) => {
        const { month, member, location } = getDataMember(index);
        return (
          <div
            role="navigation"
            key={friend.id}
            className="mb-1 relative group"
          >
            <Link href={`/profile/${friend.id}`}>
              <button
                className="icon-round-text-btn"
                onMouseEnter={(e: any) => {
                  getPosition(e);
                  toggle(friend.id);
                }}
              >
                <div className="img-icon-small">
                  <Image
                    src={friend.picture}
                    width={30}
                    height={30}
                    layout="responsive"
                    className="img-base rounded-full"
                    alt={friend.lastName}
                  />
                </div>
                <p className="text-textMedium font-normal">{`${
                  friend.firstName + " " + friend.lastName
                }`}</p>
              </button>
            </Link>

            {openModal === friend.id && (
              <div
                className="contact-modal "
                style={{
                  left: position.x,
                  top: position.y - 50,
                  transition: "all 0.15s ease-in-out",
                }}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <Image
                    width={80}
                    height={80}
                    layout="responsive"
                    src={friend.picture}
                    className="img-base rounded-full "
                    alt={friend.firstName}
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold font-headerFont">{`${
                    friend.firstName + " " + friend.lastName
                  }`}</p>
                  <div className="text-sm text-textDark grid grid-cols-12 gap-1">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className=" col-span-2 text-lg"
                    />

                    <p className="col-span-10"> {location}</p>
                  </div>
                  <div className="text-sm text-textDark grid grid-cols-12">
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
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Contacts;
