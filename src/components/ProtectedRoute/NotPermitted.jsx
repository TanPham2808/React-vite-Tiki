import { Button, Result } from "antd";


const NotPermitted = () => {
    return (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary">Back Home</Button>}
        />
    )
}

export default NotPermitted;