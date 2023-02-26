import { setPosts } from "@/store/slices/postSlice";
import { Space, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import MyPostWidget from "../myPostWidget";
import Navbar from "../navbar";
import PostWidget from "../postWidget";

const PostsWidget = ({ isProfile }) => {
  const walletAddress = useSelector((state) => state.auth.walletAddress);
  const token = useSelector((state) => state.auth.token);
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
    }, 1000);
  };

  useEffect(() => {
    const getPosts = async () => {
      const { data } = await axios.post("/api/getPosts", {
        wallet: walletAddress,
        token,
      });

      dispatch(setPosts(data));
    };
    const interval = setInterval(() => {
      getPosts();
    }, 100000);
    getPosts();
    return () => clearInterval(interval);
  }, []);

  const posts = useSelector((state) => state.posts.feedPosts);
  return (
    <>
      {!isProfile && <MyPostWidget />}
      <Space direction="vertical" style={{ display: "flex" }}>
        <InfiniteScroll
          dataLength={items.length} //This is important field to render the next data
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
              i < posts.length && (
                <PostWidget
                  key={i}
                  postProps={{
                    _id: posts[i]._id,
                    wallet: posts[i].wallet,
                    images: posts[i].images,
                    description: posts[i].escription,
                    contract: posts[i].contract,
                    likes: posts[i].likes,
                    dislikes: posts[i].dislikes,
                    categories: posts[i].categories,
                    views: posts[i].views,
                    createdAt: posts[i].createdAt,
                    tags: posts[i].tags,
                    description: posts[i].description,
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
