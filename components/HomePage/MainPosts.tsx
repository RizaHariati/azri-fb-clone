import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addMorePosts } from "../../app/store/post";
import { PostType } from "../../typing.d";
import { configGet, URL_POST } from "../../util/configAPI";
import LoadingSpinner from "../LoadingSpinner";
import Post from "./Post";
import Sponsor from "./Sponsor";

const MainPosts = () => {
  const { posts, page } = useAppSelector((state) => state.post);
  const [loading, setLoading] = useState<boolean>(false);
  const [mainPosts, setMainPosts] = useState<PostType[]>([]);
  const dispatch = useAppDispatch();
  const { ref, inView } = useInView();
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        URL_POST + "?page=" + page + "&limit=5",
        configGet
      );
      const postData = await res.json();

      if (postData.data) {
        setMainPosts((prev) => [...prev, ...postData.data]);
        dispatch(addMorePosts(posts.concat(postData.data)));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="pb-10">
      {mainPosts.map((post: PostType, index: number) => {
        if (mainPosts.length - 1 === index) {
          return (
            <div ref={ref} key={post.id}>
              <Post post={post} setMainPosts={setMainPosts} />;
            </div>
          );
        } else if (index === 3) {
          return (
            <div key={post.id}>
              <Post post={post} setMainPosts={setMainPosts} />
              <div className="md:hidden">
                <Sponsor />
              </div>
            </div>
          );
        } else {
          return (
            <div key={post.id}>
              <Post post={post} setMainPosts={setMainPosts} />
            </div>
          );
        }
      })}
      {inView && (
        <div>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default MainPosts;
