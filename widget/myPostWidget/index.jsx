import {
  FileOutlined,
  FileSearchOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
  MoreOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import { Collapse, Modal, Upload } from "antd";
import { useState } from "react";
import { Avatar, Button, Card, Dropdown, Row, Space, Typography } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Input, Tooltip } from "antd";
const { TextArea } = Input;
const { Panel } = Collapse;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const MyPostWidget = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
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

  const ownItems = [
    {
      key: "1",
      label: "Save",
    },
    {
      key: "2",
      label: "Edit",
    },
    {
      key: "3",
      danger: true,
      label: "Delete",
    },
  ];
  const walletAddress = useSelector((state) => state.auth.walletAddress);
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
            <Button type="primary">Send</Button>
          </Row>
          <TextArea
            showCount
            maxLength={100}
            style={{ height: 120, resize: "none", marginBottom: "1.5rem" }}
            placeholder="How are you feeling today?"
          />
          <Input
            style={{ marginBottom: "1.5rem" }}
            placeholder="Contract Address, e.g. 0x00000000"
            prefix={<FileTextOutlined className="site-form-item-icon" />}
            suffix={
              <Tooltip title="Fill this area if your post is about a specific token.">
                <InfoCircleOutlined />
              </Tooltip>
            }
          />
          <Collapse collapsible="header" defaultActiveKey={["1"]} size="small">
            <Panel header="Image" key="1">
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
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
