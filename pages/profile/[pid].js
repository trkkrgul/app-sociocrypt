import { useRouter } from "next/router";
import React from "react";

const Pif = () => {
  const router = useRouter();
  const { pid } = router.query;
  return <div>Post: {pid}</div>;
};

export default Pif;
