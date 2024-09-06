import { Button, Col, Form, Input, Row } from 'antd';


const InputSearch = (props) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        let query = "";
        //build query
        if (values.fullName) {
            query += `&fullName=/${values.fullName}/i`
        }
        if (values.email) {
            query += `&email=/${values.email}/i`
        }

        if (values.phone) {
            query += `&phone=/${values.phone}/i`
        }

        props.handleSearch(query);
    };

    return (
        <Form
            form={form}
            onFinish={onFinish}
        >
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`fullName`}
                        label={`Name`}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`email`}
                        label={`Email`}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name={`phone`}
                        label={`Số điện thoại`}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row style={{ paddingBottom: '20px' }}>
                <Button
                    type="primary"
                    htmlType="submit"
                >
                    Tìm kiếm
                </Button>
                {/* </Form.Item> */}
            </Row>
        </Form>
    )
}

export default InputSearch;