import React from "react";
import { useAppSelector } from "../../app/hooks";
import ModalPost from "./modals/ModalPost";
import Navbar from "./Navbar";

interface Props {
  children?: JSX.Element | JSX.Element[];
}
const Layout = ({ children }: Props) => {
  const { postModal } = useAppSelector((state) => state.tool);

  return (
    <div className="relative">
      <Navbar />
      {children}
      {postModal && <ModalPost />}
    </div>
  );
};

export default Layout;
