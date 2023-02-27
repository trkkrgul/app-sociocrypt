import {
  FileOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
  MoreOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { setPosts } from "@/store/slices/postSlice";
import { PlusOutlined } from "@ant-design/icons";
import { Collapse, message, Modal, Select, Spin, Upload } from "antd";
import { useRef, useState } from "react";
import { Avatar, Button, Card, Dropdown, Row, Space, Typography } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, Tooltip } from "antd";
const { TextArea } = Input;
const { Panel } = Collapse;
import axios from "axios";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "@/lib/firebase";
import { v4 } from "uuid";
import { toChecksumAddress } from "ethereumjs-util";
import { useMediaQuery } from "@mui/material";
import { Web3Button } from "@web3modal/react";
import {
  setAuthState,
  setAuthUser,
  setToken,
  setWalletAddress,
} from "@/store/slices/authSlice";
import LoginWidget from "../LoginWidget";
const MyPostWidget = () => {
  const isMobileDevice = useMediaQuery("(max-width: 1000px)");
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.feedPosts);
  const token = useSelector((state) => state.auth.token);
  const [description, setDescription] = useState(``);
  const [contract, setContract] = useState("");
  const [categories, setCategories] = useState(["General"]);
  const [tags, setTags] = useState([]);
  const walletAddress = useSelector((state) => state.auth.walletAddress);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const contractRef = useRef(null);
  const descriptionRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const handleSend = async () => {
    if (contract !== "") {
      try {
        toChecksumAddress(contract);
      } catch (e) {
        message.warning("invalid contract");
        return;
      }
    }
    setLoading(true);
    await axios
      .post("/api/addPost", {
        wallet: walletAddress,
        tags,
        token,
        categories,
        contract,
        images: fileList.map((file) => file?.originFileObj?.firebase),
        views: [],
        likes: [],
        comments: [],
        dislikes: [],
        description: description,
      })
      .then((res) => {
        if (res.status === 200) {
          message.success("Post created");
          setDescription(``);
          setContract("");
          setTags([]);
          setCategories(["General"]);
          contractRef.current.value = null;
          descriptionRef.current.value = null;
          setFileList([]);
          dispatch(setPosts([res.data, ...posts]));
        }
      })
      .catch((e) => {
        message.error("Something went wrong");
        setLoading(false);
        return;
      });

    setLoading(false);
  };
  const handlePhotoUpload = async (file) => {
    if (file === null) return false;

    const imageRef = ref(storage, `img/${file.name + v4()}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        file.firebase = url;
        file.url = url;

        return true;
      });
    });
  };
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    setPreviewImage(file.originFileObj.firebase);
    setPreviewOpen(true);
    setPreviewTitle(file.name);
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <>
      <Space
        direction="vertical"
        size="middle"
        style={{
          marginBottom: "1rem",
          display: "flex",
        }}
        justify="center"
      >
        {Boolean(token) && Boolean(walletAddress) ? (
          <Spin spinning={loading}>
            <Card
              size="small"
              style={{ boxShadow: "0px 12px 20px 1px rgba(0, 0, 0, .5)" }}
            >
              <Row justify={"space-between"} style={{ marginBottom: "1rem" }}>
                <Space
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
                    {walletAddress?.slice(0, 4) +
                      ".." +
                      walletAddress?.slice(-4)}
                  </Typography>
                </Space>
                <Button
                  type="primary"
                  onClick={handleSend}
                  disabled={description.length < 5}
                >
                  Send
                </Button>
              </Row>
              <TextArea
                ref={descriptionRef}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                showCount
                maxLength={100}
                style={{ height: 120, resize: "none", marginBottom: "1.5rem" }}
                placeholder="How are you feeling today?"
              />
              <Input
                ref={contractRef}
                style={{ marginBottom: "1rem" }}
                value={contract}
                onChange={(e) => setContract(e.target.value)}
                placeholder="Contract Address, e.g. 0x00000000"
                prefix={<FileTextOutlined className="site-form-item-icon" />}
                suffix={
                  <Tooltip title="Fill this area if your post is about a specific token.">
                    <InfoCircleOutlined />
                  </Tooltip>
                }
              />
              <Space
                style={{
                  marginBottom: "1rem",
                  display: "flex",

                  justifyContent: "space-between",
                }}
                direction={isMobileDevice ? "vertical" : "horizontal"}
                align="space-between"
              >
                <Select
                  mode="tags"
                  style={{
                    width: "100%",
                    minWidth: "200px",
                  }}
                  placeholder="Add tags"
                  value={tags}
                  onChange={(e) => {
                    setTags(e);
                  }}
                />
                <Select
                  defaultValue="general"
                  style={{
                    width: 120,
                  }}
                  value={categories[0]}
                  onChange={(e) => {
                    setCategories([e]);
                  }}
                  options={[
                    {
                      value: "T. Analysis",
                      label: "T. Analysis",
                    },
                    {
                      value: "Airdrop",
                      label: "Airdrop",
                    },
                    {
                      value: "General",
                      label: "General",
                    },
                    {
                      value: "Shilling",
                      label: "Shilling",
                    },
                    {
                      value: "Listings",
                      label: "Listings",
                    },
                    {
                      value: "News",
                      label: "News",
                    },
                  ]}
                />
              </Space>
              <Collapse
                collapsible="header"
                defaultActiveKey={["0"]}
                size="small"
              >
                <Panel header="Image" key="1">
                  <Upload
                    accept="image/*"
                    listType="picture-circle"
                    fileList={fileList}
                    beforeUpload={handlePhotoUpload}
                    onPreview={handlePreview}
                    onChange={handleChange}
                  >
                    {fileList.length >= 4 ? null : uploadButton}
                  </Upload>
                  <Modal
                    open={previewOpen}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                  >
                    <img
                      alt=""
                      style={{
                        width: "100%",
                      }}
                      src={previewImage}
                    />
                  </Modal>
                </Panel>
              </Collapse>
            </Card>
          </Spin>
        ) : (
          <LoginWidget />
        )}
      </Space>
    </>
  );
};

export default MyPostWidget;
