import { Badge, Descriptions, Drawer } from "antd";
import moment from "moment";

const UserDetail = (props) => {
    const { openDetailUser, setOpenDetailUser, infoUser } = props;

    return (
        <>
            {infoUser &&
                <>
                    <Drawer
                        title="Chức năng xem chi tiết"
                        width={'50wh'}
                        onClose={() => setOpenDetailUser(false)}
                        open={openDetailUser}
                    >
                        <Descriptions
                            title="Thông tin User"
                            bordered
                            column={2}>
                            <Descriptions.Item label="Id">{infoUser._id}</Descriptions.Item>
                            <Descriptions.Item label="Tên hiển thị">{infoUser.fullName}</Descriptions.Item>
                            <Descriptions.Item label="Email">{infoUser.email}</Descriptions.Item>
                            <Descriptions.Item label="Số điện thoại">{infoUser.phone}</Descriptions.Item>
                            <Descriptions.Item label="Role" span={2}>
                                <Badge status="processing" text={infoUser.role} />
                            </Descriptions.Item>
                            <Descriptions.Item label="Create At">{moment(infoUser.createdAt).format('DD-MM-YYYY')}</Descriptions.Item>
                            <Descriptions.Item label="Update At">{moment(infoUser.updatedAt).format('DD-MM-YYYY')}</Descriptions.Item>
                        </Descriptions>;
                    </Drawer>

                </>
            }
        </>
    )
}

export default UserDetail;