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
import moment from "moment";
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
import { useMediaQuery } from "@mui/material";
import useTokenJSON from "@/hooks/useTokenJSON";
import { useRouter } from "next/router";

const { Text, Link } = Typography;
const PostWidget = ({ postProps }) => {
  const router = useRouter();
  const { tokenJSON } = useTokenJSON({ tokenA: postProps.contract });

  const tokenPrice =
    parseFloat(tokenJSON?.wBNBPrice) * parseFloat(tokenJSON?.priceInBNB);
  const tokenLog = parseInt(Math.log10(tokenPrice) * -1 + 2);
  const isMobileDevice = useMediaQuery("(max-width: 1000px)");
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
            marginBottom: "1rem",
          }}
          justify="center"
        >
          <Card size="small">
            <Row justify={"space-between"} style={{ marginBottom: "1rem" }}>
              <Space
                onClick={() => router.push(`/profile/${postProps.wallet}`)}
                direction="horizontal"
                size="middle"
                style={{
                  display: "flex",
                }}
                justify="left"
              >
                <Avatar
                  shape="square"
                  size={40}
                  style={{
                    border: "1px solid #ff564e",
                    backgroundColor: "#000",
                  }}
                  icon={<UserOutlined style={{ color: "#ff564e" }} />}
                />
                <Typography className="gradient-text">
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
              style={{ whiteSpace: "pre-wrap" }}
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
                          key={image}
                          wrapperStyle={{
                            overflow: "hidden",
                            width: postProps.images.length > 1 ? "50%" : "100%",

                            display: "flex",
                            height:
                              postProps.images.length > 1
                                ? isMobileDevice
                                  ? "150px"
                                  : "200px"
                                : "100%",

                            border: "1px solid #ffffff30",
                          }}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            overflow: "hidden",
                          }}
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
                  direction="vertical"
                  size="middle"
                  style={{
                    display: "flex",
                  }}
                  justify="left"
                >
                  <Descriptions bordered size="small" layout="vertical">
                    <Descriptions.Item label="Token">
                      <Space>
                        <Avatar
                          shape="circle"
                          src={`https://static.metaswap.codefi.network/api/v1/tokenIcons/56/${
                            Boolean(tokenJSON?.TokenAddressInfo) &&
                            tokenJSON?.TokenAddressInfo.toLowerCase()
                          }.png `}
                        />
                        <Typography.Text strong ellipsis>
                          {tokenJSON?.TokenNameInfo}
                        </Typography.Text>
                      </Space>
                    </Descriptions.Item>
                    <Descriptions.Item label="Contract">
                      <Typography.Text strong copyable>
                        {postProps.contract}
                      </Typography.Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Price">
                      <Typography.Text strong ellipsis>
                        {tokenJSON?.priceInUSD?.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: Math.max(
                            tokenLog > 0 && tokenLog < 15 ? tokenLog : 0,
                            2
                          ),
                        })}
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
              <Divider type="vertical" />
              <Typography.Text disabled>
                {postProps.categories[0]}
              </Typography.Text>
              <Divider type="vertical" />
              <Typography.Text disabled>
                {moment(postProps.createdAt).fromNow()}
              </Typography.Text>
            </Space>
          </Card>
        </Space>
      )}
    </>
  );
};

export default PostWidget;
