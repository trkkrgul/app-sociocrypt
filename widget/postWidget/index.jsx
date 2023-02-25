import { setPosts } from "@/store/slices/postSlice";
import {
  CommentOutlined,
  DislikeOutlined,
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
  Descriptions,
} from "antd";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const { Text, Link } = Typography;
const PostWidget = ({ postProps }) => {
  const dispatch = useDispatch();
  const walletAddress = useSelector((state) => state.auth.walletAddress);
  const token = useSelector((state) => state.auth.token);
  const posts = useSelector((state) => state.posts.feedPosts);
  const handleDelete = async () => {
    const { data } = await axios.post("/api/deletePost", {
      wallet: walletAddress,
      _id: postProps._id,
      token,
    });
    console.log(data);
    if (data?.deletedCount === 1) {
      dispatch(setPosts(posts.filter((post) => post._id !== postProps._id)));
    }
  };
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
        <Typography.Text disabled> Save to your favourites</Typography.Text>
      ),
    },

    {
      key: "3",
      danger: true,
      onClick: () => handleDelete(),
      label: <Typography.Text> Delete</Typography.Text>,
    },
  ];

  return (
    <>
      {postProps && (
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
                  {postProps.wallet?.slice(0, 4) +
                    ".." +
                    postProps.wallet?.slice(-4)}
                </Typography>
              </Space>
              <Dropdown
                menu={{
                  items:
                    postProps.wallet === walletAddress ? ownItems : feedItems,
                }}
                placement="bottomRight"
              >
                <Button>
                  <MoreOutlined />
                </Button>
              </Dropdown>
            </Row>
            <Typography
              style={{ whiteSpace: "pre" }}
            >{`${postProps.description}`}</Typography>
            {Boolean(postProps.images.length > 0) && (
              <Row
                justify={"space-between"}
                style={{
                  marginTop: "1rem",
                  background: "#00000050",
                }}
              >
                <Image.PreviewGroup>
                  {postProps.images.map(
                    (image) =>
                      Boolean(image) && (
                        <Image
                          wrapperStyle={{
                            overflow: "hidden",
                            width: postProps.images.length > 1 ? "50%" : "100%",

                            display: "flex",
                            height:
                              postProps.images.length > 1 ? "200px" : "100%",

                            border: "1px solid #ffffff30",
                          }}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            overflow: "hidden",
                          }}
                          key={image}
                          src={image}
                        />
                      )
                  )}
                </Image.PreviewGroup>
              </Row>
            )}
            {Boolean(postProps.contract) && (
              <Row justify={"space-between"} style={{ margin: "1rem 0" }}>
                <Space
                  direction="horizontal"
                  size="middle"
                  style={{
                    display: "flex",
                  }}
                  justify="left"
                >
                  <Descriptions bordered size="small">
                    <Descriptions.Item label="Contract">
                      <Avatar
                        style={{ marginRight: "0.5rem" }}
                        shape="circle"
                        icon={<UserOutlined />}
                      />
                      <Typography.Text strong>
                        {postProps.contract?.slice(0, 4) +
                          ".." +
                          postProps.contract?.slice(-4)}
                      </Typography.Text>
                    </Descriptions.Item>
                  </Descriptions>
                </Space>
              </Row>
            )}
            <Space direction="horizontal" style={{ marginTop: "0.5rem" }}>
              <Space>
                <HeartOutlined />
                <Text>{postProps.likes.length}</Text>
              </Space>
              <Divider type="vertical" />
              <Space>
                <DislikeOutlined />
                <Text>{postProps.dislikes.length}</Text>
              </Space>
              <Divider type="vertical" />
              <ShareAltOutlined />
            </Space>
          </Card>
        </Space>
      )}
    </>
  );
};

export default PostWidget;
