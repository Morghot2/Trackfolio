import React from "react";
import { useSelector } from "react-redux";

const PostCrypto = () => {
  const state = useSelector((state) => state.crypto);
  return <div>CryptoElement</div>;
};

export default PostCrypto;
