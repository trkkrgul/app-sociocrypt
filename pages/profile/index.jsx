import LeftTabWidget from "@/widget/leftTabWidget";
import Navbar from "@/widget/navbar";
import PostsWidget from "@/widget/postsWidget";
import RightTab from "@/widget/rightTab";
import { Col, Row } from "antd";
import React from "react";
import UserWidget from "@/widget/UserWidget";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserPortfolio from "@/widget/leftTabWidget/userHoldings.jsx";
const Profile = () => {
  const isMobileDevice = useMediaQuery("(max-width: 1000px)");
  const wallet = useSelector((state) => state.auth.walletAddress);
  const token = useSelector((state) => state.auth.token);

  return (
    <>
      <Navbar />
      {token && !isMobileDevice && (
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
            <UserWidget wallet={wallet} />
          </Col>
          <Col
            span={6}
            style={{
              position: "sticky",
              top: "calc(64px)",
              height: "700px",
            }}
          >
            <UserPortfolio />
            {/* <LeftTabWidget activeKey={"1"} /> */}
          </Col>
          <Col span={isMobileDevice ? 16 : 11}>
            <PostsWidget isProfile wallet={wallet} />
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
      )}
      {isMobileDevice && (
        <PostsWidget isProfile={false} wallet={walletAddress} />
      )}
    </>
  );
};

export default Profile;
