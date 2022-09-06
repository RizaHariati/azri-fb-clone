import React from "react";
import { useAppSelector } from "../../app/hooks";
import ModalPost from "./modals/ModalPost";
import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";
import ModalEdit from "./modals/ModalEdit";
import Footer from "./Footer";
interface Props {
  children?: JSX.Element | JSX.Element[];
}
const Layout = ({ children }: Props) => {
  const { postModal } = useAppSelector((state) => state.tool);

  return (
    <div className="relative">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      {children}
      {postModal === "Create" && <ModalPost />}
      {postModal === "Edit" && <ModalEdit />}
      <Footer />
    </div>
  );
};

export default Layout;
