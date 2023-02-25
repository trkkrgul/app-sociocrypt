import { setPosts } from "@/store/slices/postSlice";
import { Space, Typography } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyPostWidget from "../myPostWidget";
import Navbar from "../navbar";
import PostWidget from "../postWidget";

const PostsWidget = ({ isProfile }) => {
  const walletAddress = useSelector((state) => state.auth.walletAddress);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  useEffect(() => {
    const interval = setInterval(() => {
      const getPosts = async () => {
        const { data } = await axios.post("/api/getPosts", {
          wallet: walletAddress,
          token,
        });

        dispatch(setPosts(data));
      };
      getPosts();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const posts = useSelector((state) => state.posts.feedPosts);
  return (
    <>
      {!isProfile && <MyPostWidget />}
      <Space direction="vertical" style={{ display: "flex" }}>
        {posts.map(
          (
            {
              wallet,
              images,
              description,
              contract,
              likes,
              dislikes,
              categories,
              views,
              tags,
              _id,
            },
            i
          ) => (
            <PostWidget
              key={_id}
              postProps={{
                _id,
                wallet,
                images,
                description,
                contract,
                likes,
                dislikes,
                categories,
                views,
                tags,
              }}
            />
          )
        )}
        <PostWidget /> <PostWidget /> <PostWidget /> <PostWidget />
      </Space>
    </>
  );
};

export default PostsWidget;
