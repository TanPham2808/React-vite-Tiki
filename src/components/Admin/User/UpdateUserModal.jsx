import { Divider, Form, Input, Modal, notification } from "antd";
import { useEffect } from "react";
import { updateUserAPI } from "../../../services/user.api";

const UpdateUserModal = (props) => {
    const [form] = Form.useForm();
    const { isModalUpdateOpen, setIsModalUpdateOpen, getDataUser, dataUserUpdate } = props;

    const onFinish = async (values) => {
        const res = await updateUserAPI(values._id, values.fullName, values.phone);
        if (res.data) {
            notification.success({
                message: "Update User",
                description: "Cập nhật người dùng thành công"
            })
            // Clear form
            form.resetFields();

            // Đóng modal & load lại data
            setIsModalUpdateOpen(false);
            await getDataUser();
        } else {
            notification.error({
                message: "Update User error",
                description: JSON.stringify(res.message)
            })
        }
    };

    useEffect(() => {
        form.setFieldsValue(dataUserUpdate)
    }, [dataUserUpdate])

    return (
        <Modal forceRender title="Cập nhật mới người dùng"
            maskClosable={false}
            open={isModalUpdateOpen}
            onOk={() => form.submit()}
            onCancel={() => setIsModalUpdateOpen(false)}>
            <Divider />

            <Form
                layout='vertical'
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    hidden
                    label="Tên hiển thị"
                    name="_id"
                >
                    <Input placeholder="input placeholder" />
                </Form.Item>
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
                    label="Email"
                    name="email"
                >
                    <Input disabled />
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

export default UpdateUserModal