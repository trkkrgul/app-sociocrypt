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
  Spin,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import useTokenJSON from "@/hooks/useTokenJSON";
import { useRouter } from "next/router";

import useUserBalance from "@/hooks/useUserBalance";

const { Text, Link } = Typography;
const PostWidget = ({ postProps }) => {
  const router = useRouter();
  const { tokenJSON } = useTokenJSON({ tokenA: postProps?.contract });
  const tokenPrice =
    parseFloat(tokenJSON?.wBNBPrice) * parseFloat(tokenJSON?.priceInBNB);
  const tokenLog = parseInt(Math.log10(tokenPrice) * -1 + 2);
  const isMobileDevice = useMediaQuery("(max-width: 1000px)");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const walletAddress = useSelector((state) => state.auth.walletAddress);
  const token = useSelector((state) => state.auth.token);
  const posts = useSelector((state) => state.posts.feedPosts);

  const { userBalance } = useUserBalance({
    userWallet: postProps?.wallet,
    tokenA: "0x7035d3b1cb1ced246e3bce35b1c7073a97530787",
  });

  const handleLike = async (type) => {
    setLoading(true);
    const { data } = await axios.post(`/api/handleLike`, {
      wallet: walletAddress,
      token,
      type,
      postId: postProps?._id,
    });
    dispatch(
      setPosts(posts.map((post) => (post._id === postProps?._id ? data : post)))
    );
    setLoading(false);
  };
  const handleDelete = async () => {
    const { data } = await axios.post("/api/deletePost", {
      wallet: walletAddress,
      _id: postProps?._id,
      token,
    });

    if (data?.deletedCount === 1) {
      dispatch(setPosts(posts.filter((post) => post._id !== postProps?._id)));
    }
  };
  const feedItems = [
    {
      key: "1",
      label: (
        <Typography.Text disabled> Save to your favourites</Typography.Text>
      ),
    },
    {
      key: "2",
      danger: true,
      label: <Typography.Text disabled> Report</Typography.Text>,
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

  useEffect(() => {}, []);
  return (
    <>
      {Boolean(postProps._id) && (
        <Space
          direction="vertical"
          size="middle"
          style={{
            display: "flex",
            marginBottom: "1rem",
          }}
          justify="center"
        >
          <Spin spinning={loading}>
            <Card size="small">
              <Row justify={"space-between"} style={{ marginBottom: "1rem" }}>
                <Space
                  onClick={() => router.push(`/profile/${postProps?.wallet}`)}
                  direction="horizontal"
                  size="middle"
                  style={{
                    cursor: "pointer",
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
                    {postProps?.wallet?.slice(0, 4) +
                      ".." +
                      postProps?.wallet?.slice(-4)}
                  </Typography>
                  <Divider type="vertical" />
                  <Typography.Text strong ellipsis>
                    {userBalance?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    $SOCIO
                  </Typography.Text>
                </Space>
                {Boolean(token) && (
                  <Dropdown
                    menu={{
                      items:
                        postProps?.wallet === walletAddress
                          ? ownItems
                          : feedItems,
                    }}
                    placement="bottomRight"
                  >
                    <Button>
                      <MoreOutlined />
                    </Button>
                  </Dropdown>
                )}
              </Row>
              <Typography
                style={{ whiteSpace: "pre-wrap" }}
              >{`${postProps?.description}`}</Typography>
              {Boolean(postProps?.images?.length > 0) && (
                <Row
                  justify={"space-between"}
                  style={{
                    marginTop: "1rem",
                    background: "#00000050",
                  }}
                >
                  <Image.PreviewGroup>
                    {postProps?.images.map(
                      (image) =>
                        Boolean(image) && (
                          <Image
                            key={image}
                            wrapperStyle={{
                              overflow: "hidden",
                              width:
                                postProps?.images?.length > 1 ? "50%" : "100%",

                              display: "flex",
                              height:
                                postProps?.images?.length > 1
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
              {Boolean(postProps?.contract) && (
                <Row justify={"space-between"} style={{ margin: "1rem 0" }}>
                  <Space
                    direction="horizontal"
                    style={{
                      width: "100%",
                      display: "flex",
                    }}
                  >
                    <Descriptions
                      bordered
                      size="small"
                      layout="vertical"
                      column={isMobileDevice ? 1 : 2}
                    >
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
                          {postProps?.contract}
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
                      <Descriptions.Item label="Your Balance">
                        <Typography.Text strong>
                          {userBalance?.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}{" "}
                          ${tokenJSON.TokenSymbolInfo}
                        </Typography.Text>
                      </Descriptions.Item>
                    </Descriptions>
                  </Space>
                </Row>
              )}
              <Space direction="horizontal" style={{ marginTop: "0.5rem" }}>
                {Boolean(walletAddress) && Boolean(token) && (
                  <>
                    <Space>
                      {postProps.likes.filter((e) => e.wallet === walletAddress)
                        .length > 0 ? (
                        <HeartFilled
                          style={{ color: "red" }}
                          onClick={() => handleLike("unlike")}
                        />
                      ) : (
                        <HeartOutlined onClick={() => handleLike("like")} />
                      )}
                      <Text>{postProps.likesCount}</Text>
                    </Space>
                    <Divider type="vertical" />
                  </>
                )}

                <ShareAltOutlined />
                <Divider type="vertical" />
                <Typography.Text disabled>
                  {postProps?.categories?.join(", ")}
                </Typography.Text>
                <Divider type="vertical" />
                <Typography.Text disabled>
                  {moment(postProps?.createdAt).fromNow()}
                </Typography.Text>
              </Space>
            </Card>
          </Spin>
        </Space>
      )}
    </>
  );
};

export default PostWidget;
