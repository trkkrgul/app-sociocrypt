import { Card, Typography } from "antd";
import { useRouter } from "next/router";
import React from "react";

const UserProfile = () => {
  const router = useRouter();
  const id = router.query.id;
  return <Card>{id}</Card>;
};

export default UserProfile;
