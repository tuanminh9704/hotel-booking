import React from "react";
import { Card, Avatar, Button, Typography, Space, Table, Tag } from "antd";
import {
    EditOutlined,
    MailOutlined,
    PhoneOutlined,
    UserOutlined,
    ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Profile.scss";

const { Title, Text } = Typography;

export default function Profile() {
    const fullName = localStorage.getItem("fullName") || "Chưa có tên";
    const email = localStorage.getItem("email") || "Chưa có email";
    const phone = localStorage.getItem("phone") || "Chưa có số điện thoại";
    const navigate = useNavigate();

    // Dữ liệu giả danh sách phòng đã đặt
    const dataSource = [
        {
            key: '1',
            roomName: 'Phòng Deluxe 101',
            checkIn: '2024-06-01',
            checkOut: '2024-06-05',
            status: 'Đã thanh toán',
        },
        {
            key: '2',
            roomName: 'Phòng Suite 203',
            checkIn: '2024-05-10',
            checkOut: '2024-05-15',
            status: 'Chưa thanh toán',
        },
    ];

    // Cột của bảng
    const columns = [
        {
            title: 'Tên phòng',
            dataIndex: 'roomName',
            key: 'roomName',
        },
        {
            title: 'Ngày nhận',
            dataIndex: 'checkIn',
            key: 'checkIn',
        },
        {
            title: 'Ngày trả',
            dataIndex: 'checkOut',
            key: 'checkOut',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status === "Đã thanh toán" ? "green" : "volcano"}>
                    {status}
                </Tag>
            ),
        },
    ];

    return (
        <div className="profile-container">
            <Card className="profile-card">
                <div className="profile-header">
                    <Button
                        type="link"
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate(-1)}
                        className="profile-back-button"
                    >
                        Quay lại
                    </Button>
                </div>

                <div className="profile-horizontal">
                    <Avatar size={100} icon={<UserOutlined />} />
                    <div className="profile-info">
                        <Title level={3}>{fullName}</Title>
                        <Space direction="vertical" size="small">
                            <Text><MailOutlined /> {email}</Text>
                            <Text><PhoneOutlined /> {phone}</Text>
                        </Space>
                    </div>
                </div>

                <div className="profile-extra">
                    <h2 style={{marginBottom: "20px"}}>Danh sách phòng đã đặt :</h2>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                        rowKey="key"
                    />
                </div>
            </Card>
        </div>
    );
}
