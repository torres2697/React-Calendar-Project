import { Row } from "antd";
import Layout from "antd/es/layout/layout";
import React, { FC } from "react";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <Layout>
      <Row justify="center" align="middle" className="h100"><LoginForm/></Row>
    </Layout>
  );
};

export default Login;
