import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { FullProfileType } from "../../typing.d";
import {
  faCakeCandles,
  faEnvelope,
  faLocationPin,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
interface Props {
  profile: FullProfileType;
}
const ProfileInfo = ({ profile }: Props) => {
  const [pronoun, setpronoun] = useState("They/Them");
  useEffect(() => {
    const gender = profile.title === "mr" ? "He/Him" : "She/Her";
    setpronoun(gender);
  }, [profile]);

  const { city, state, country } = profile.location;
  return (
    <div className=" bg-primaryMedium rounded-md shadow-sm shadow-black mt-5 text-textMedium p-5">
      <h1 className="text-xl text-textLight font-semibold mb-3">Intro</h1>
      <div>
        <div className="profile-intro">
          <FontAwesomeIcon icon={faLocationPin} />
          <p className="text-sm">
            Lives in {city}, {state}, {country}
          </p>
        </div>

        <div className="profile-intro">
          <FontAwesomeIcon icon={faCakeCandles} />
          <p className="text-sm">
            Birthday {moment(profile.dateOfBirth).format("LL")}
          </p>
        </div>

        <div className="profile-intro">
          <FontAwesomeIcon icon={faEnvelope} />
          <p className="text-sm">Email {profile.email}</p>
        </div>

        <div className="profile-intro">
          <FontAwesomeIcon icon={faUser} />
          <p className="text-sm">Pronoun {pronoun}</p>
        </div>

        <div className="profile-intro">
          <FontAwesomeIcon icon={faPhone} />
          <p className="text-sm">Call me on {profile.phone}</p>
        </div>
      </div>
      <button className="profile-info-btn"> button</button>
    </div>
  );
};

export default ProfileInfo;
