import {
  CommentOutlined,
  HeartFilled,
  HeartOutlined,
  LikeOutlined,
  MoreOutlined,
  ShareAltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Space,
  Typography,
  Card,
  Row,
  Col,
  Avatar,
  Dropdown,
  Button,
  Image,
  Badge,
  Divider,
} from "antd";
import React from "react";
import { useSelector } from "react-redux";

const { Text, Link } = Typography;
const PostWidget = () => {
  const feedItems = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Save
        </a>
      ),
    },
    {
      key: "2",
      danger: true,
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Report
        </a>
      ),
    },
  ];
  const ownItems = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Save
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Edit
        </a>
      ),
    },
    {
      key: "3",
      danger: true,
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Delete
        </a>
      ),
    },
  ];
  const walletAddress = useSelector((state) => state.auth.walletAddress);
  const posts = useSelector((state) => state.posts.feedPosts);
  return (
    <>
      <Space
        direction="vertical"
        size="middle"
        style={{
          display: "flex",
        }}
        justify="center"
      >
        <Card size="small">
          <Row justify={"space-between"} style={{ marginBottom: "1rem" }}>
            <Space
              direction="horizontal"
              size="middle"
              style={{
                display: "flex",
              }}
              justify="left"
            >
              <Avatar shape="square" icon={<UserOutlined />} />
              <Typography>
                {walletAddress?.slice(0, 4) + ".." + walletAddress?.slice(-4)}
              </Typography>
            </Space>
            <Dropdown
              menu={{
                items: ownItems,
              }}
              placement="bottomRight"
            >
              <Button>
                <MoreOutlined />
              </Button>
            </Dropdown>
          </Row>
          <Typography>asalksdşada 🥹</Typography>
          <Row
            justify={"space-between"}
            style={{
              marginTop: "1rem",
              background: "#00000050",
            }}
          >
            <Image.PreviewGroup>
              <Image
                style={{ border: "1px solid #ffffff30" }}
                width={"50%"}
                height={"50%"}
                src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              />
              <Image
                style={{ border: "1px solid #ffffff30" }}
                width={"50%"}
                src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              />
              <Image
                style={{ border: "1px solid #ffffff30" }}
                width={"50%"}
                src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
              />
              <Image
                style={{ border: "1px solid #ffffff30" }}
                width={"50%"}
                src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
              />
            </Image.PreviewGroup>
          </Row>
          <Space direction="horizontal" style={{ marginTop: "0.5rem" }}>
            <div>
              <HeartOutlined /> <Text code>1</Text>
            </div>
            <Divider type="vertical" />
            <div>
              <CommentOutlined /> <Text code>1</Text>
            </div>
            <Divider type="vertical" />
            <ShareAltOutlined />
          </Space>
        </Card>
      </Space>
    </>
  );
};

export default PostWidget;
