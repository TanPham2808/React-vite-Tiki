import React, { useState } from "react";
import { Button, Divider, Form, Input, message, notification } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../../services/api";
import { useDispatch } from "react-redux";
import { doLoginAction } from "../../redux/account/accountSlice";

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Sử dụng Redux
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    setIsLoading(true);
    const res = await loginAPI(values.username, values.password, 2000);
    setIsLoading(false);

    if (res?.data) {
      localStorage.setItem("access_token", res.data.access_token);

      // Nạp data vào redux
      dispatch(doLoginAction(res.data.user))

      message.success("Đăng nhập thành công");
      navigate("/");
    } else {
      notification.error({
        message: "Lỗi đăng nhập",
        description: res.message,
      });
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h1 style={{ textAlign: "center" }}>ĐĂNG NHẬP</h1>
      <Divider />
      <Form
        form={form}
        name="basic"
        layout="vertical"
        style={{
          maxWidth: 600,
          margin: "0 auto",
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Đăng nhập
            </Button>
          )}
        </Form.Item>
        <Divider>Or</Divider>
        <p className="text text-normal">
          Chưa có tài khoản ?
          <span>
            <Link to="/register"> Đăng ký </Link>
          </span>
        </p>
      </Form>
    </div>
  );
};

export default LoginPage;
