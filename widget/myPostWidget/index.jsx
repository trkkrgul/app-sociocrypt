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
import { Collapse, Modal, Upload } from "antd";
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

const MyPostWidget = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.feedPosts);
  const token = useSelector((state) => state.auth.token);
  const [description, setDescription] = useState(` `);
  const [contract, setContract] = useState("");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const walletAddress = useSelector((state) => state.auth.walletAddress);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const contractRef = useRef(null);
  const descriptionRef = useRef(null);
  const handleSend = async () => {
    const { data } = await axios.post("/api/addPost", {
      wallet: walletAddress,
      tags: ["crypto"],
      token,
      categories: ["crypto", "nft"],
      contract: contract,
      images: fileList.map((file) => file?.originFileObj?.firebase),
      views: [],
      likes: [],
      comments: [],
      dislikes: [],
      description: description,
    });

    if (Boolean(data._id)) {
      setDescription(` `);
      setContract("");
      contractRef.current.value = null;
      descriptionRef.current.value = null;
      setFileList([]);
    }
    dispatch(setPosts([data, ...posts]));
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
    console.log(file);
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
          position: "sticky",
          top: "calc( 64px )",
          zIndex: 999,
          marginBottom: "1rem",
          display: "flex",
        }}
        justify="center"
      >
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
              <Avatar shape="square" icon={<UserOutlined />} />
              <Typography>
                {walletAddress?.slice(0, 4) + ".." + walletAddress?.slice(-4)}
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
            onChange={(e) => setDescription(e.target.value)}
            showCount
            maxLength={100}
            style={{ height: 120, resize: "none", marginBottom: "1.5rem" }}
            placeholder="How are you feeling today?"
          />
          <Input
            ref={contractRef}
            style={{ marginBottom: "1.5rem" }}
            onChange={(e) => setContract(e.target.value)}
            placeholder="Contract Address, e.g. 0x00000000"
            prefix={<FileTextOutlined className="site-form-item-icon" />}
            suffix={
              <Tooltip title="Fill this area if your post is about a specific token.">
                <InfoCircleOutlined />
              </Tooltip>
            }
          />
          <Collapse collapsible="header" defaultActiveKey={["0"]} size="small">
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
      </Space>
    </>
  );
};

export default MyPostWidget;
