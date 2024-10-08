import React, { useEffect, useState } from 'react';
import { Button, notification, Popconfirm, Space, Table } from 'antd';
import { deleteUserAPI, fetchUserAPI } from '../../../services/user.api';
import { FaRegTrashAlt } from 'react-icons/fa';
import InputSearch from './InputSearch';
import UserDetail from './UserDetail';
import { CloudUploadOutlined, EditOutlined, ExportOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import CreateUserModal from './CreateUserModal';
import UserImport from './data/UserImport';
import * as XLSX from 'xlsx';
import UpdateUserModal from './UpdateUserModal';

const UserTable = () => {
    const [dataUser, setDataUser] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    const [sortQuery, setSortQuery] = useState("");
    const [filter, setFilter] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [openDetailUser, setOpenDetailUser] = useState(false);
    const [infoUser, setInfoUser] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUserUpdate, setDataUserUpdate] = useState();

    const getDataUser = async () => {
        setIsLoading(true);
        let query = `current=${currentPage}&pageSize=${pageSize}`;
        if (filter) {
            query += `&${filter}`
        }

        if (sortQuery) {
            query += `&${sortQuery}`;
        }

        const res = await fetchUserAPI(query);
        setIsLoading(false);
        if (res.data) {
            setDataUser(res.data.result);
            setCurrentPage(res.data.meta.current);
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }

    useEffect(() => {
        getDataUser();
    }, [currentPage, pageSize, sortQuery, filter])

    const confirm = async (id) => {
        const res = await deleteUserAPI(id);
        if (res.data) {
            notification.success({
                message: "Delete User",
                description: "Xóa người dùng thành công"
            })
            await getDataUser();
        } else {
            notification.error({
                message: "Delete User error",
                description: JSON.stringify(res.message)
            })
        }
    }

    const columns = [
        {
            title: 'Tên hiển thị',
            render: (_, record) =>
            (
                <a href='#'
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        setOpenDetailUser(true);
                        setInfoUser(record);
                    }}>{record.fullName}</a>
            )
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: true
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            sorter: true
        },
        {
            title: 'Action',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: 20 }}>
                    <EditOutlined
                        style={{ color: 'orange', cursor: 'pointer' }}
                        onClick={() => {
                            setIsModalUpdateOpen(true);
                            setDataUserUpdate(record);
                        }}
                    />
                    <Popconfirm
                        title="Xóa người dùng"
                        description="Bạn có chác chắn muốn xóa?"
                        onConfirm={() => confirm(record._id)}
                        onCancel={() => { }}
                        okText="Xác nhận"
                        cancelText="Hủy"
                    >
                        <FaRegTrashAlt style={{ color: 'red', cursor: 'pointer' }} />
                    </Popconfirm>
                </div>

            ),
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current !== currentPage) {
            setCurrentPage(pagination.current);
        }
        if (pagination && pagination.pageSize !== pageSize) {
            setPageSize(pagination.pageSize);
            setCurrentPage(1);
        }
        if (sorter && sorter.field) {
            let querySort = sorter.order === 'ascend' ? `sort=${sorter.field}` : `sort=-${sorter.field}`;
            setSortQuery(querySort);
        }
    };

    const handleExport = () => {
        if (dataUser && dataUser.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(dataUser);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "ExportUser.csv");
        }
    }

    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Table List User</span>
                <span style={{ display: 'flex', gap: 15 }}>
                    <Button
                        icon={<ExportOutlined />}
                        type="primary"
                        onClick={() => handleExport()}>Export
                    </Button>
                    <Button
                        icon={<CloudUploadOutlined />}
                        type="primary"
                        onClick={() => {
                            setIsImportModalOpen(true)
                        }}>Import
                    </Button>
                    <Button
                        icon={<PlusOutlined />}
                        type="primary"
                        onClick={() => {
                            setIsModalOpen(true);
                        }}>Thêm mới
                    </Button>
                    <Button type="ghost"
                        onClick={() => {
                            setFilter("");
                            setSortQuery("");
                        }}>
                        <ReloadOutlined />
                    </Button>
                </span>
            </div>
        )
    }

    const handleSearch = (searchFilter) => {
        setFilter(searchFilter);
    }

    return (
        <>
            <InputSearch
                isLoading={isLoading}
                handleSearch={handleSearch}
            />
            <Table
                title={renderHeader}
                rowKey="_id"
                columns={columns}
                dataSource={dataUser}
                loading={isLoading}
                pagination={
                    {
                        current: currentPage,
                        pageSize: pageSize,
                        total: total,
                        showSizeChanger: true,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }}
                onChange={onChange} />
            <UserDetail
                openDetailUser={openDetailUser}
                setOpenDetailUser={setOpenDetailUser}
                infoUser={infoUser} />
            <CreateUserModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                getDataUser={getDataUser}
            />
            <UpdateUserModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={setIsModalUpdateOpen}
                dataUserUpdate={dataUserUpdate}
                getDataUser={getDataUser}
            />
            <UserImport
                isImportModalOpen={isImportModalOpen}
                setIsImportModalOpen={setIsImportModalOpen}
                getDataUser={getDataUser}
            />
        </>
    )
}

export default UserTable;