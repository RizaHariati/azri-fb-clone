import React, { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addMorePosts } from "../../app/store/post";
import { PostType } from "../../typing.d";
import LoadingSpinner from "../LoadingSpinner";
import Post from "./Post";
const URL_POST = "https://dummyapi.io/data/v1/post?";

const config = {
  method: "GET",
  headers: { "app-id": "615d134132c9c40bf2a39437" },
};

const MainPosts = () => {
  const { posts, page } = useAppSelector((state) => state.post);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { ref, inView } = useInView();
  useEffect(() => {
    fetchData();
  }, [inView]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(URL_POST + "page=" + page + "&limit=5", config);
      const postData = await res.json();

      if (postData.data) {
        dispatch(addMorePosts(posts.concat(postData.data)));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="pb-10">
      {posts.map((post: PostType, index: number) => {
        if (posts.length - 1 === index) {
          return (
            <div ref={ref} key={post.id}>
              <Post post={post} />;
            </div>
          );
        } else {
          return (
            <div key={post.id}>
              <Post post={post} />
            </div>
          );
        }
      })}
      {loading && (
        <div>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default MainPosts;
