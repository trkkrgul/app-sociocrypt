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
import { useMediaQuery } from "@mui/material";

const Navbar = () => {
  const router = useRouter();
  const isMobileDevice = useMediaQuery("(max-width: 1000px)");
  const dispatch = useDispatch();
  const walletAddress = useSelector((state) => state.auth.walletAddress);
  const userBalance = useSelector((state) => state.auth.userBalance);
  const { Search } = Input;
  const handleLogout = () => {
    dispatch(setWalletAddress(null));
    dispatch(setUserBalance(null));
    router.push("/login");
  };
  const items = [
    {
      label: "Your Profile",
      key: "1",
      icon: <UserOutlined />,
      onClick: () => {
        router.push("/profile");
      },
    },
    {
      label: "Favourites",
      key: "2",
      icon: <UserOutlined />,
    },
    {
      label: Number(userBalance).toFixed(2),
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
    {
      label: "Logout",
      key: "5",
      icon: <UserOutlined />,
      danger: true,
      onClick: () => {
        handleLogout();
      },
    },
  ];
  const menuProps = {
    items,
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
          background: "#000",
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
        {!isMobileDevice && (
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
        )}

        <Col>
          <Space direction="horizontal" style={{ margin: "0rem 1rem" }}>
            <Dropdown menu={menuProps}>
              <Button>
                <Space>
                  {walletAddress?.slice(0, 4) + ".." + walletAddress?.slice(-4)}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
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
