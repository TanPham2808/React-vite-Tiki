import React, { useEffect, useState } from 'react';
import { Space, Table } from 'antd';
import { fetchUserAPI } from '../../../services/user.api';
import { FaRegTrashAlt } from 'react-icons/fa';

const UserTable = () => {
    const [dataUser, setDataUser] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    const getDataUser = async () => {
        const res = await fetchUserAPI(currentPage, pageSize);
        if (res.data) {
            setDataUser(res.data.result);
            setCurrentPage(res.data.meta.current);
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }

    useEffect(() => {
        getDataUser();
    }, [currentPage, pageSize])

    const columns = [
        {
            title: 'Tên hiển thị',
            dataIndex: 'fullName',
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
                <FaRegTrashAlt
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => { alert('click me') }}
                />
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
    };

    return (
        <>
            <Table
                rowKey="_id"
                columns={columns}
                dataSource={dataUser}
                pagination={
                    {
                        current: currentPage,
                        pageSize: pageSize,
                        total: total,
                        showSizeChanger: true
                    }}
                onChange={onChange} />
        </>
    )
}

export default UserTable;