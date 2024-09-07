import { InboxOutlined } from "@ant-design/icons";
import { message, Modal, notification, Table, Upload } from 'antd';
import { useState } from "react";
import * as XLSX from 'xlsx';
import { createListUserAPI } from "../../../../services/user.api";
import templateFile from './TemplateDownloadUserImport.csv?url';

const UserImport = (props) => {
    const { isImportModalOpen, setIsImportModalOpen, getDataUser } = props;
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [dataImport, setDataImport] = useState([]);
    const { Dragger } = Upload;

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 2000);
    };

    const propsUpload = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        accept: ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
        // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        customRequest: dummyRequest,
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }

            if (status === 'done') {
                if (info.fileList && info.fileList.length > 0) {
                    const file = info.fileList[0].originFileObj;
                    let reader = new FileReader();

                    reader.onload = function (e) {
                        let data = new Uint8Array(e.target.result);
                        let workbook = XLSX.read(data, { type: 'array' });
                        // find the name of your sheet in the workbook first
                        let sheet = workbook.Sheets[workbook.SheetNames[0]];

                        // convert to json format
                        const jsonData = XLSX.utils.sheet_to_json(sheet, {
                            header: ["fullName", "email", "phone"],
                            range: 1 // Bỏ qua header
                        });
                        if (jsonData && jsonData.length > 0) {
                            setDataImport(jsonData);
                        }
                    };
                    reader.readAsArrayBuffer(file);

                    message.success(`${info.file.name} file uploaded successfully.`);
                }
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const handleSubmit = async () => {
        setConfirmLoading(true);
        const arrListUser = dataImport.map(item => {
            item.password = '123456';
            return item;
        })

        const res = await createListUserAPI(arrListUser);
        if (res.data) {
            notification.success({
                message: "Import User",
                description: `Success:${res.data.countSuccess}, Error:${res.data.countError}`
            })

            // Đóng modal & load lại data
            setIsImportModalOpen(false);
            setDataImport([]);
            await getDataUser();
        } else {
            notification.error({
                message: "Import User error",
                description: JSON.stringify(res.message)
            })
        }
        setConfirmLoading(false);
    }

    return (
        <Modal title="Import data user" open={isImportModalOpen}
            onOk={() => handleSubmit()}
            onCancel={() => {
                setIsImportModalOpen(false);
                setDataImport([])
            }}
            okText="Import data"
            okButtonProps={{
                disabled: dataImport.length < 1
            }}
            maskClosable={false}
            width='50vw'
            confirmLoading={confirmLoading}
        >
            <Dragger {...propsUpload}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Only accept .csv, xls, xlsx...
                    <a
                        onClick={e => e.stopPropagation()}
                        href={templateFile}
                        download>Download Sample File
                    </a>
                </p>
            </Dragger>
            <div style={{ paddingTop: 20 }}>
                <Table
                    rowKey="fullName"
                    title={() => <span>Dữ liệu upload:</span>}
                    columns={[
                        { dataIndex: 'fullName', title: 'Tên hiển thị' },
                        { dataIndex: 'email', title: 'Email' },
                        { dataIndex: 'phone', title: 'Số điện thoại' }
                    ]}
                    dataSource={dataImport}
                />;
            </div>
        </Modal>
    )
}

export default UserImport;