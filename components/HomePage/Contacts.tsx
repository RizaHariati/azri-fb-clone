import { faGratipay } from "@fortawesome/free-brands-svg-icons";
import {
  faDigitalTachograph,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { FriendType } from "../../typing.d";

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
                  />
                </div>
                <p className="text-textMedium font-normal">{`${
                  friend.firstName + " " + friend.lastName
                }`}</p>
              </button>
            </Link>

            {openModal === friend.id && (
              <div
                className="contact-modal"
                style={{ left: position.x, top: position.y - 50 }}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <Image
                    width={80}
                    height={80}
                    layout="responsive"
                    src={friend.picture}
                    className="img-base rounded-full "
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold mb-2">{`${
                    friend.firstName + " " + friend.lastName
                  }`}</p>
                  <p className="text-sm text-textDark">
                    <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                    {location}
                  </p>
                  <p className="text-xs text-textDark">
                    <FontAwesomeIcon icon={faGratipay} className="mr-2" />
                    member since : {`${month} ${member}`}
                  </p>
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
