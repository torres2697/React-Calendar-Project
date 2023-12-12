import { Button, Form, Input } from "antd";
import Card from "antd/es/card/Card";
import React, { useState } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { rules } from "../utils/rules";

const LoginFrom = () => {
  const { error, isLoading } = useTypedSelector((state) => state.auth);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { login } = useActions();
  const onFinish = () => {
    login(userName, userPassword);
  };
  return (
    <Card>
      <Form onFinish={onFinish}>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <Form.Item
          label="Username"
          name="username"
          rules={[rules.required("Please input your username!")]}
        >
          <Input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[rules.required("Please input your password!")]}
        >
          <Input.Password
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginFrom;
