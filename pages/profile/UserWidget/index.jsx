import { UserOutlined } from "@ant-design/icons";
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
const UserWidget = () => {
  const { Paragraph } = Typography;

  const walletAddress = useSelector((state) => state.auth.walletAddress);
  const { useToken } = theme;
  const { token } = useToken();
  const article =
    "MetaSoccer is the first soccer metaverse where you can manage your own club and generate income while you play. Youth Scouts are a fundamental pillar of the game: the introduction of new players to the MetaSoccer universe depends on them (known as Scouting).";
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
            background: "linear-gradient(135deg, #ff564e 0%,#fad126 100%)",
            height: "240px",
            marginBottom: "-150px",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            padding: "0rem",
          }}
        >
          <Image
            wrapperStyle={{ width: "100%" }}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
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
              borderRadius: "8px",
              overflow: "hidden !important",
              border: "6px solid #000",
            }}
            width={200}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
          <Space direction="vertical">
            <Typography.Text style={{ fontSize: "1.5rem" }} strong>
              @username
            </Typography.Text>
            <Typography.Text code copyable>
              {walletAddress?.slice(0, 4) + "..." + walletAddress?.slice(-4)}
            </Typography.Text>
          </Space>
        </Space>
        <Space
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
          direction="vertical"
        >
          <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "more" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            consectetur, nunc vel tincidunt lacinia, nunc nisl aliquet nisl, nec
            lacinia nunc nisl eget nunc. Donec auctor, nunc vel tincidunt
            lacinia, nunc nisl aliquet nisl, nec lacinia nunc nisl eget nunc.
            Donec auctor, nunc vel tincidunt
          </Paragraph>

          <Space direction="horizontal">
            <Tooltip placement="bottom" title={"Link"}>
              <Avatar shape="square" size="small" icon={<UserOutlined />} />
            </Tooltip>{" "}
            <Tooltip placement="bottom" title={"Link"}>
              <Avatar shape="square" size="small" icon={<UserOutlined />} />
            </Tooltip>{" "}
            <Tooltip placement="bottom" title={"Link"}>
              <Avatar shape="square" size="small" icon={<UserOutlined />} />
            </Tooltip>{" "}
            <Tooltip placement="bottom" title={"Link"}>
              <Avatar shape="square" size="small" icon={<UserOutlined />} />
            </Tooltip>{" "}
            <Tooltip placement="bottom" title={"Link"}>
              <Avatar shape="square" size="small" icon={<UserOutlined />} />
            </Tooltip>{" "}
            <Tooltip placement="bottom" title={"Link"}>
              <Avatar shape="square" size="small" icon={<UserOutlined />} />
            </Tooltip>
          </Space>
        </Space>
      </Space>
    </>
  );
};

export default UserWidget;
