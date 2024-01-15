import { Button, Form, Input } from "antd";
import Card from "antd/es/card/Card";
import Modal from "antd/es/modal/Modal";
import RegisterForm from "../components/RegisterForm";
import React, { useEffect, useState } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { rules } from "../utils/rules";
import { useForm } from "antd/es/form/Form";

const LoginFrom = () => {
  const { error, isLoading } = useTypedSelector((state) => state.auth);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [modalRegisterVisible, setModalRegisterVisible] = useState(false);

  const { login } = useActions();

  const [form] = useForm();

  const clearLoginFormFields = () => {
    form.setFieldsValue({ username: "", password: "" });
  };

  const closeRegisterModal = () => {
    setModalRegisterVisible(false);
  };

  const onFinish = () => {
    login(userName, userPassword, clearLoginFormFields);
  };

  return (
    <Card>
      <Form form={form} onFinish={onFinish}>
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
          <Button
            onClick={() => setModalRegisterVisible(true)}
            style={{ marginLeft: "20px" }}
            type="default"
            htmlType="button"
          >
            Register
          </Button>
          <Modal
            onCancel={closeRegisterModal}
            footer={null}
            title="Registration Form"
            open={modalRegisterVisible}
          >
            <RegisterForm closeRegisterModal={closeRegisterModal} />
          </Modal>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginFrom;
