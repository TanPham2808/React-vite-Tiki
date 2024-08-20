import { Button, Divider, Form, Input } from 'antd';

const RegisterPage = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Success:', values);
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
                        loading={false}>
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default RegisterPage;