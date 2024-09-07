import { Button, Divider, Form, Input, Modal, notification } from "antd";
import { createUserAPI } from "../../../services/user.api";

const CreateUserModal = (props) => {
    const { isModalOpen, setIsModalOpen, getDataUser } = props;
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const res = await createUserAPI(values.fullName, values.password, values.email, values.phone);
        if (res.data) {
            notification.success({
                message: "Create User",
                description: "Thêm người dùng thành công"
            })
            // Clear form
            form.resetFields();

            // Đóng modal & load lại data
            setIsModalOpen(false);
            await getDataUser();
        } else {
            notification.error({
                message: "Create User error",
                description: JSON.stringify(res.message)
            })
        }
    };

    return (
        <Modal title="Thêm mới người dùng"
            maskClosable={false}
            open={isModalOpen}
            onOk={() => form.submit()}
            onCancel={() => setIsModalOpen(false)}>
            <Divider />

            <Form
                layout='vertical'
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Tên hiển thị"
                    name="fullName"
                    rules={[
                        {
                            required: true,
                            message: 'Không bỏ trống Tên!',
                        },
                    ]}>
                    <Input placeholder="input placeholder" />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password">
                    <Input placeholder="input placeholder" />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Không bỏ trống Email!',
                        },
                    ]}>
                    <Input placeholder="input placeholder" />
                </Form.Item>
                <Form.Item
                    label="Số điện thoại"
                    name="phone">
                    <Input placeholder="input placeholder" />
                </Form.Item>
            </Form>
        </Modal>





    )
}

export default CreateUserModal;