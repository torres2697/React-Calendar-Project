import { Button, Form, Input } from "antd";
import Card from "antd/es/card/Card";
import Modal from "antd/es/modal/Modal";
import React, { useState } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { rules } from "../utils/rules";

type RegisterFormProps = {
  onSucessfulRegister: () => void;
};

const RegisterForm = ({ onSucessfulRegister }: RegisterFormProps) => {
  const { error, isLoading } = useTypedSelector((state) => state.auth);
  const [userNameRegister, setUserNameRegister] = useState("");
  const [userPasswordRegister, setUserPasswordRegister] = useState("");
  const [userPasswordRegisterRepeat, setUserPasswordRegisterRepeat] =
    useState("");
  const { register } = useActions();

  const onFinish = () => {
    register(
      userNameRegister,
      userPasswordRegister,
      userPasswordRegisterRepeat,
      onSucessfulRegister
    );
    // setUserNameRegister("");
    // setUserPasswordRegister("");
    // setUserPasswordRegisterRepeat("");
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
            value={userNameRegister}
            onChange={(e) => setUserNameRegister(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[rules.required("Please input your password!")]}
        >
          <Input.Password
            value={userPasswordRegister}
            onChange={(e) => setUserPasswordRegister(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Confirm your password"
          name="passwordConfirm"
          rules={[rules.required("Please confirm your password!")]}
        >
          <Input.Password
            value={userPasswordRegisterRepeat}
            onChange={(e) => setUserPasswordRegisterRepeat(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Registration
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default RegisterForm;
