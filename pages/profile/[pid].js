import Navbar from "@/widget/navbar";
import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import LeftTabWidget from "@/widget/leftTabWidget";
import PostsWidget from "@/widget/postsWidget";
import RightTab from "@/widget/rightTab";
import { Col, Row } from "antd";
import React from "react";
import UserWidget from "@/widget/UserWidget";
import UserPortfolio from "@/widget/leftTabWidget/userHoldings.jsx";
import { useSelector } from "react-redux";

const Pif = () => {
  const router = useRouter();
  const { pid } = router.query;
  const token = useSelector((state) => state.auth.token);
  const isMobileDevice = useMediaQuery("(max-width: 1000px)");
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
            <UserWidget wallet={pid} />
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
            <PostsWidget isProfile wallet={pid} />
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
      {isMobileDevice && <PostsWidget isProfile={false} wallet={pid} />}
    </>
  );
};

export default Pif;
