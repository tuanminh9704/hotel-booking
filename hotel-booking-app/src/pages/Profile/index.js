import { useEffect, useState } from "react";
import { Card, Avatar, Button, Typography, Space, Table, Tag } from "antd";
import {
    MailOutlined,
    PhoneOutlined,
    UserOutlined,
    ArrowLeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Profile.scss";
import { getUserById } from "../../Service/UserServices";

const { Title, Text } = Typography;

export default function Profile() {
    const fullName = localStorage.getItem("fullName") || "Chưa có tên";
    const email = localStorage.getItem("email") || "Chưa có email";
    const phone = localStorage.getItem("phone") || "Chưa có số điện thoại";
    const userId = localStorage.getItem("userId")?.trim();

    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getUserById(userId);
                const userData = res.user;

                const enrichedBookings = (userData.bookings || []).map(b => ({
                    ...b,
                    key: b.id,
                }));

                setUser({
                    ...userData,
                    bookings: enrichedBookings,
                });
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu người dùng:", error);
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    const columns = [
        {
            title: "Loại phòng",
            dataIndex: "room",
            key: "roomName",
            render: (room) => <div>{room?.name || "Không rõ"}</div>,
        },
        {
            title: "Ngày nhận phòng",
            dataIndex: "checkInDate",
            key: "checkInDate",
        },
        {
            title: "Ngày trả phòng",
            dataIndex: "checkOutDate",
            key: "checkOutDate",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                let color = "default";
                const lower = status?.toLowerCase();

                if (lower === "confirmed") color = "green";
                else if (lower === "pending") color = "orange";
                else if (lower === "canceled") color = "red";

                return <Tag color={color}>{status}</Tag>;
            },
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
                            <Text>
                                <MailOutlined /> {email}
                            </Text>
                            <Text>
                                <PhoneOutlined /> {phone}
                            </Text>
                        </Space>
                    </div>
                </div>

                <div className="profile-extra">
                    <h2 style={{ marginBottom: "20px" }}>Danh sách phòng đã đặt:</h2>
                    <Table
                        dataSource={user?.bookings || []}
                        columns={columns}
                        pagination={false}
                        rowKey="key"
                    />
                </div>
            </Card>
        </div>
    );
}
