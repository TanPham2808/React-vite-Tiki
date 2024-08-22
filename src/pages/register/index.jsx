import { Button, Divider, Form, Input, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { registerUserAPI } from '../../services/api';

const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigation = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onFinish = async (values) => {
        setIsLoading(true);
        const res = await registerUserAPI(
            values.fullName,
            values.email,
            values.password,
            values.phone
        )
        setIsLoading(false);
        if (res?.data?._id) {
            notification.success({
                message: 'Đăng ký người dùng',
                description: 'Đăng ký thành công'
            })

            // Redirect page về login
            navigation("/login");
        } else {
            notification.error({
                message: 'Lỗi đăng ký người dùng',
                description: res.message
            })
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div style={{ padding: '50px' }}>
            <h1 style={{ textAlign: 'center' }}>ĐĂNG KÝ NGƯỜI DÙNG</h1>
            <Divider />
            <Form
                form={form}
                layout='vertical'
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                    margin: '0 auto'
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Họ tên"
                    name="fullName"
                    rules={[
                        {
                            required: true,
                            message: 'Không để trống Full name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Không để trống Email',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Không để trống mật khẩu!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            pattern: new RegExp(/\d+/g),
                            message: 'Nhập số điện thoại!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}>
                        Đăng ký
                    </Button>
                </Form.Item>

                <Divider>Or</Divider>
                <p className="text text-normal">Đã có tài khoản ?
                    <span>
                        <Link to='/login' > Đăng Nhập </Link>
                    </span>
                </p>

            </Form>
        </div>
    )
}

export default RegisterPage;