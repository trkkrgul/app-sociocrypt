import {
  CopyFilled,
  CopyOutlined,
  CopyTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import { CopyAllRounded } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Image,
  Row,
  Space,
  theme,
  Tooltip,
  Typography,
} from "antd";
import React from "react";
import { useSelector } from "react-redux";
const UserWidget = ({ wallet }) => {
  return (
    <>
      <Space
        style={{
          display: "flex",
          margin: "0 auto",
          marginBottom: "4rem",
          width: "100%",
          maxWidth: "calc(100% - 4rem)",
        }}
        direction="vertical"
        justify="center"
      >
        <div
          style={{
            width: "100%",
            height: "240px",
            marginBottom: "-150px",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            padding: "0rem",
            borderRadius: "1rem",
          }}
        >
          <Image
            wrapperStyle={{ width: "100%" }}
            src="https://firebasestorage.googleapis.com/v0/b/socio-378818.appspot.com/o/img%2FScreen%20Shot%202023-02-26%20at%2009.12.07.png61264a55-378f-4551-9659-d49af882e1e3?alt=media&token=a84fdbab-f098-46ef-bfb3-2b2922a85c71"
          />
        </div>
        <Space
          direction="vertical"
          align="center"
          justify="center"
          style={{
            display: "flex",
            padding: "0 1rem",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Image
            style={{
              borderRadius: "2rem",
              overflow: "hidden !important",
              border: "6px solid #000",
            }}
            width={200}
            src="https://firebasestorage.googleapis.com/v0/b/socio-378818.appspot.com/o/img%2Fdefault_avatar.webpda4750d4-fca7-46a0-86ff-9db3e477595f?alt=media&token=173e69d1-63a9-4b38-9688-861c38bf82f0"
          />
          <Space
            direction="horizontal"
            style={{ display: "flex" }}
            onClick={() => {
              window.navigator.clipboard.writeText(wallet);
            }}
          >
            <Typography.Text style={{ fontSize: "1.5rem" }} strong>
              {wallet?.slice(0, 4) + "..." + wallet?.slice(-4)}
            </Typography.Text>
            <CopyAllRounded sx={{ color: "#fff", cursor: "pointer" }} />
          </Space>
        </Space>
      </Space>
    </>
  );
};

export default UserWidget;
