import { Space } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import MyPostWidget from "../myPostWidget";
import PostWidget from "../postWidget";

const PostsWidget = () => {
  const posts = useSelector((state) => state.posts.feedPosts);
  return (
    <>
      <MyPostWidget />
      <Space direction="vertical" style={{ display: "flex" }}>
        {posts?.map((post) => (
          <PostWidget key={post} />
        ))}
        <PostWidget /> <PostWidget /> <PostWidget /> <PostWidget />
      </Space>
    </>
  );
};

export default PostsWidget;
