import LeftTabWidget from "@/widget/leftTabWidget";
import Navbar from "@/widget/navbar";
import PostsWidget from "@/widget/postsWidget";
import RightTab from "@/widget/rightTab";
import { Col, Row } from "antd";
import React from "react";
import UserWidget from "./UserWidget";
import { useMediaQuery } from "@mui/material";
const Profile = () => {
  const isMobileDevice = useMediaQuery("(max-width: 1000px)");
  return (
    <>
      <Navbar />

      <Row
        justify="center"
        style={{
          gap: "1rem",
          width: "100%",
          maxWidth: "1192px",
          margin: "0 auto",
        }}
      >
        <Col span={24}>
          <UserWidget />
        </Col>
        <Col
          span={"auto"}
          style={{
            position: "sticky",
            top: "calc(  64px )",
            height: "700px",
          }}
        >
          <LeftTabWidget activeKey={"2"} />
        </Col>
        <Col span={isMobileDevice ? 16 : 12}>
          <PostsWidget isProfile />
        </Col>

        {!isMobileDevice && (
          <Col
            span={6}
            style={{
              position: "sticky",
              top: "calc(  64px )",
              height: "700px",
            }}
          >
            <RightTab />
          </Col>
        )}
      </Row>
    </>
  );
};

export default Profile;
