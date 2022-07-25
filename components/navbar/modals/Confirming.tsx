import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Toast } from "react-hot-toast";

interface Props {
  t: Toast;
  postID: string;
  handleClick: (postID: string, tId: string) => Promise<void>;
  alertType: string;
  alertText: string;
}

import React from "react";

const Confirming = ({
  t,
  postID,
  handleClick,
  alertText,
  alertType,
}: Props) => {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-textPrimary shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className="text-xl text-red-700 mr-2"
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-red-700">Alert</p>
            <p className="mt-1 text-sm text-primaryDark">{alertText}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-primaryMedium">
        <button
          onClick={() => handleClick(postID, t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:text-red-700"
        >
          {alertType}
        </button>
      </div>
    </div>
  );
};

export default Confirming;
