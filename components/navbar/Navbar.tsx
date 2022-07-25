import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { FriendType } from "../../typing.d";
import LogoSearch from "./LogoSearch";
import NavLinks from "./NavLinks";
import NavMenu from "./NavMenu";

const Navbar = () => {
  const mainProfile: FriendType = useAppSelector(
    (state) => state.friend.mainProfile
  );

  return (
    <nav className="navbar-container">
      <div className="navbar">
        <LogoSearch />
        {mainProfile?.id !== "" && (
          <>
            <NavLinks />
            <NavMenu />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;