import React, { useEffect, useState } from 'react';
import { Space, Table } from 'antd';
import { fetchUserAPI } from '../../../services/user.api';
import { FaRegTrashAlt } from 'react-icons/fa';
import InputSearch from './InputSearch';
import UserDetail from './UserDetail';

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
        if (sorter && sorter.field) {
            let querySort = sorter.order === 'ascend' ? `sort=${sorter.field}` : `sort=-${sorter.field}`;
            setSortQuery(querySort);
        }
    };

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
            <UserDetail
                openDetailUser={openDetailUser}
                setOpenDetailUser={setOpenDetailUser}
                infoUser={infoUser} />
        </>
    )
}

export default UserTable;