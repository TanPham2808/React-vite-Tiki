import React, { useEffect, useState } from 'react';
import { Space, Table } from 'antd';
import { fetchUserAPI } from '../../../services/user.api';
import { FaRegTrashAlt } from 'react-icons/fa';
import InputSearch from './InputSearch';

const UserTable = () => {
    const [dataUser, setDataUser] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    const getDataUser = async (searchFilter) => {
        setIsLoading(true);
        let query = `current=${currentPage}&pageSize=${pageSize}`;
        if (searchFilter) {
            query += `&${searchFilter}`
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

    const handleSearch = async (searchFilter) => {
        await getDataUser(searchFilter);
    }

    return (
        <>
            <InputSearch
                isLoading={isLoading}
                handleSearch={handleSearch}
            />
            <Table
                rowKey="_id"
                columns={columns}
                dataSource={dataUser}
                loading={isLoading}
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