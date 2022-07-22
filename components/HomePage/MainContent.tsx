import React from "react";
import MainPosts from "./MainPosts";
import PostingForm from "./PostingForm";
import Stories from "./Stories";

const MainContent = () => {
  return (
    <div className="main-content">
      <Stories />
      <PostingForm />
      <MainPosts />
    </div>
  );
};

export default MainContent;
