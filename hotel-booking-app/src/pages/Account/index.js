import { Table, Button, Popconfirm, Select, message, Space } from 'antd';
import { useState } from 'react';

export function Account() {
    const [users, setUsers] = useState([
        {
            id: 1,
            name: 'Nguyễn Văn A',
            email: 'a@gmail.com',
            role: 'USER',
        },
        {
            id: 2,
            name: 'Trần Quang Dũng',
            email: 'dungdz@gmail.com',
            role: 'ADMIN',
        },
        {
            id: 3,
            name: 'Lê Thị B',
            email: 'b@gmail.com',
            role: 'USER',
        },
    ]);

    const handleRoleChange = (id, newRole) => {
        const updatedUsers = users.map(user =>
            user.id === id ? { ...user, role: newRole } : user
        );
        setUsers(updatedUsers);
        message.success('Cập nhật quyền thành công!');
    };

    const handleDelete = (id) => {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
        message.success('Xóa người dùng thành công!');
    };

    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
            render: (text, record) => (
                <Select
                    value={record.role}
                    style={{ width: 120 }}
                    onChange={(value) => handleRoleChange(record.id, value)}
                >
                    <Select.Option value="ADMIN">ADMIN</Select.Option>
                    <Select.Option value="USER">USER</Select.Option>
                </Select>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Popconfirm
                    title="Bạn có chắc muốn xóa người này?"
                    onConfirm={() => handleDelete(record.id)}
                    okText="Xóa"
                    cancelText="Hủy"
                >
                    <Button danger>Xóa</Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <>
            <h1 style={{marginBottom: "40px"}}>Quản lý tài khoản</h1>
            <Table
                dataSource={users}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                bordered
            />
        </>
    );
}
