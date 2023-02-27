import { setPosts } from "@/store/slices/postSlice";
import { Web3Button } from "@web3modal/react";
import { Space, Typography } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import MyPostWidget from "../myPostWidget";
import Navbar from "../navbar";
import PostWidget from "../postWidget";

const PostsWidget = ({ isProfile, wallet }) => {
  const dispatch = useDispatch();
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState(Array.from({ length: 10 }));
  const fetchMoreData = () => {
    if (items.length >= posts.length) {
      setHasMore(false);
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      setItems((prev) => prev.concat(Array.from({ length: 5 })));
    }, 3000);
  };

  useEffect(() => {
    const getPosts = async () => {
      const { data } = await axios.post(
        `/api/getPosts${isProfile ? "?userWallet=" + wallet : ""}`
      );
      dispatch(setPosts(data));
    };
    getPosts();
  }, []);

  const posts = useSelector((state) => state.posts.feedPosts);
  return (
    <>
      {!isProfile && <MyPostWidget />}
      <Space direction="vertical" style={{ display: "flex" }}>
        <InfiniteScroll
          dataLength={items.length} //Ths is important field to render the next data
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <Typography style={{ textAlign: "center" }}>Loading</Typography>
          }
          endMessage={
            <Typography style={{ textAlign: "center" }}>
              You have seen it all
            </Typography>
          }
          // below props only if you need pull down functionality
        >
          {items.map(
            (e, i) =>
              !(i >= posts.length) && (
                <PostWidget
                  key={i}
                  postProps={{
                    ...posts[i],
                  }}
                />
              )
          )}
        </InfiniteScroll>
      </Space>
    </>
  );
};

export default PostsWidget;
