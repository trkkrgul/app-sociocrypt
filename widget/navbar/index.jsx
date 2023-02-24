import { setUserBalance, setWalletAddress } from "@/store/slices/authSlice";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Web3Button } from "@web3modal/react";
import {
  Space,
  Row,
  Col,
  Typography,
  Tooltip,
  Button,
  Input,
  message,
  Divider,
  Dropdown,
} from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const walletAddress = useSelector((state) => state.auth.walletAddress);
  const { Search } = Input;
  const handleMenuClick = (e) => {
    message.info("Not ready yet!");
  };
  const items = [
    {
      label: "Your Profile",
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "Favourites",
      key: "2",
      icon: <UserOutlined />,
    },
    {
      label: "Wallet",
      key: "3",
      icon: <UserOutlined />,
      disabled: true,
    },
    {
      label: "Settings",
      key: "4",
      icon: <UserOutlined />,
      disabled: true,
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <>
      <Row
        style={{
          height: "64px",
          zIndex: "999",
          width: "100%",
          borderBottom: "1px solid #111418",
          padding: "0rem 1rem",
          marginBottom: "calc( 1rem + 64px )",
          backdropFilter: "blur(10px)",
          position: "fixed",
          justifyContent: "space-between",
        }}
        align="middle"
      >
        <Col span={{ xs: 24, md: 4 }}>
          <Typography
            style={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
            onClick={() => {
              router.push("/");
            }}
          >
            socio<span className="gradient-text">crypt</span>
          </Typography>
        </Col>
        <Col>
          <Space direction="horizontal" style={{ margin: "0rem 1rem" }}>
            <Typography style={{ cursor: "pointer" }}>Posts</Typography>
            <Divider type="vertical"></Divider>
            <Typography style={{ cursor: "pointer" }}>Tokens</Typography>
            <Divider type="vertical"></Divider>
            <Typography style={{ cursor: "pointer" }}>
              Today's Listings
            </Typography>
            <Divider type="vertical"></Divider>
            <Search
              placeholder="Search post, user, token"
              onSearch={null}
              allowClear
            />
          </Space>
        </Col>
        <Col>
          {" "}
          <Space direction="horizontal" style={{ margin: "0rem 1rem" }}>
            <Dropdown menu={menuProps}>
              <Button>
                <Space>
                  {walletAddress?.slice(0, 4) + ".." + walletAddress?.slice(-4)}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
            <Button
              onClick={() => {
                dispatch(setWalletAddress(null));
                dispatch(setUserBalance(null));
                router.push("/login");
              }}
            >
              Log Out
            </Button>
          </Space>
        </Col>
      </Row>
      <Row
        style={{
          height: "64px",
          marginBottom: "1rem",
        }}
        align="middle"
      ></Row>
    </>
  );
};

export default Navbar;
