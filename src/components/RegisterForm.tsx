import { Button, Form, Input } from "antd";
import Card from "antd/es/card/Card";
import { useForm } from "antd/es/form/Form";
import Modal from "antd/es/modal/Modal";
import React, { useState } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { rules } from "../utils/rules";

type RegisterFormProps = {
  closeRegisterModal: () => void;
};

const RegisterForm = ({ closeRegisterModal }: RegisterFormProps) => {
  const { regFormError, regFormLoading } = useTypedSelector(
    (state) => state.registration
  );
  const [userNameRegister, setUserNameRegister] = useState("");
  const [userPasswordRegister, setUserPasswordRegister] = useState("");
  const [userPasswordRegisterRepeat, setUserPasswordRegisterRepeat] =
    useState("");
  const [modalSuccessRegisterVisible, setModalSuccessRegisterVisible] =
    useState(false);

  const { register } = useActions();

  const [form] = useForm();

  // const clearRegisterFormFields = () => {
  //   form.setFieldsValue({ username: "", password: "", passwordConfirm: "" });
  // };

  const openSuccessRegisterModal = () => {
    setModalSuccessRegisterVisible(true);
  };

  const closeSuccessRegisterModal = () => {
    setModalSuccessRegisterVisible(false);
  };

  const handleSucessfulRegistration = () => {
    closeRegisterModal();
    openSuccessRegisterModal();
  };

  const onFinish = () => {
    register(
      userNameRegister,
      userPasswordRegister,
      userPasswordRegisterRepeat,
      handleSucessfulRegistration,
      // clearRegisterFormFields,
      form
    );
  };

  return (
    <Card>
      <Form form={form} onFinish={onFinish}>
        {regFormError && <div style={{ color: "red" }}>{regFormError}</div>}
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
          <Button type="primary" htmlType="submit" loading={regFormLoading}>
            Registration
          </Button>
          <Modal
            onCancel={closeSuccessRegisterModal}
            footer={null}
            title=""
            open={modalSuccessRegisterVisible}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ fontSize: "24px", padding: "60px 0" }}>
                You have successfully registered!
              </div>
            </div>
          </Modal>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default RegisterForm;
