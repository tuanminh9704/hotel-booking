import React, { useEffect, useState } from "react";
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
import { getAllUser, getUserById } from "../../Service/UserServices";
import { getHotelByID } from "../../Service/HotelService";
import { getRoomById } from "../../Service/RoomService";

const { Title, Text } = Typography;

export default function Profile() {
    const fullName = localStorage.getItem("fullName") || "Chưa có tên";
    const email = localStorage.getItem("email") || "Chưa có email";
    const phone = localStorage.getItem("phone") || "Chưa có số điện thoại";

    const navigate = useNavigate();
    const [user, setUser] = useState();

    const getHotelNameById = async (id) => {
        const response = await getHotelByID(id);
        return(response?.hotelList[0]?.name)        
    }

    const getRoomNameById = async (id) => {
        const response = await getRoomById(id);
        return(response?.roomList[0]?.name)
    }

    useEffect(() => {
        const fetchAPI = async () => {
            const response = await getUserById(localStorage.getItem("userId"));
            const data = response.user;
            setUser(data);
        } 
        fetchAPI();
    },[]);

    const dataSource = user?.bookings;

    // Cột của bảng
    const columns = [
        {
        title: 'Khách sạn',
        dataIndex: 'hotel_id',
        key: 'hotel_id',
        render: (hotel_id) => (
            <div>{getHotelNameById(hotel_id)}</div>
        ),
    },
    {
        title: 'Loại phòng',
        dataIndex: 'room_type_id',
        key: 'room_type_id',
        render: (room_type_id) => (
            <div>{getRoomNameById(room_type_id)}</div>
        )
    },
    {
        title: 'Ngày nhận phòng',
        dataIndex: 'check_in_date',
        key: 'check_in_date',
    },
    {
        title: 'Ngày trả phòng',
        dataIndex: 'check_out_date',
        key: 'check_out_date',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: (status) => (
            <Tag color={status === "PAID" || status === "Đã thanh toán" ? "green" : "volcano"}>
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
