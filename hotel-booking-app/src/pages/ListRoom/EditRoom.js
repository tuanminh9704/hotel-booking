import { Button, Col, Form, Input, InputNumber, message, Modal, Row, Select } from "antd";
import { EditOutlined } from '@ant-design/icons';
import { useState } from "react";
import { getHotelByID } from "../../Service/HotelService";
import { editHotel } from "../../Service/RoomService";

const { Option } = Select;

function EditRoom(props) {
    const { record, reLoad } = props;

    const [isShowModal, setIsShowModal] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();

    // Danh sách tiện ích mẫu (đồng bộ với CreateRoom.jsx)
    const availableAmenities = [
        { id: 'amenity1', name: 'Ban công' },
        { id: 'amenity2', name: 'View biển' },
        { id: 'amenity3', name: 'TV thông minh' },
        { id: 'amenity4', name: 'Máy pha cà phê' },
        { id: 'amenity5', name: 'Bồn tắm' },
        { id: 'amenity6', name: 'Wi-Fi tốc độ cao' },
        { id: 'amenity7', name: 'Máy lạnh' },
        { id: 'amenity8', name: 'Tủ lạnh mini' },
        { id: 'amenity9', name: 'Két sắt' },
        { id: 'amenity10', name: 'Đèn ngủ' },
        { id: 'amenity11', name: 'Bàn làm việc' },
        { id: 'amenity12', name: 'Máy sấy tóc' },
        { id: 'amenity13', name: 'Dép đi trong nhà' },
        { id: 'amenity14', name: 'Bình nước nóng' },
        { id: 'amenity15', name: 'Rèm cản sáng' },
    ];

    const rules = [
        {
            required: true,
            message: 'Không được bỏ trống!',
        },
    ];

    const priceRules = [
        {
            required: true,
            message: 'Không được bỏ trống!',
        },
        {
            type: 'number',
            min: 1,
            message: 'Giá phải lớn hơn 0 VND!',
        },
    ];

    const handleCancel = () => {
        setIsShowModal(false);
        form.resetFields();
    };

    const showModal = () => {
        setIsShowModal(true);
    };

    const handleSubmit = async (values) => {
        if (values.price <= 0) {
            messageApi.open({
                type: "error",
                content: "Giá phải lớn hơn 0 VND!",
            });
            return;
        }

        const updatedRoomData = {
            id: record.id,
            name: values.name,
            quantityBed: values.quantityBed,
            quantityPeople: values.quantityPeople,
            roomArea: values.roomArea,
            price: values.price,
            availableRooms: values.availableRooms,
            amenities: values.amenities?.map((amenityId) => ({
                id: `amenity-${Date.now()}-${amenityId}`,
                name: availableAmenities.find((a) => a.id === amenityId)?.name || amenityId,
                roomTypeId: record.id,
            })) || [],
            hotelId: record.hotelId,
        };

        try {
            // Lấy dữ liệu khách sạn hiện tại
            const hotelResponse = await getHotelByID(record.hotelId);
            const hotelData = hotelResponse.data || hotelResponse;

            // Cập nhật mảng roomTypes: thay thế phòng cũ bằng phòng đã chỉnh sửa
            const updatedRoomTypes = hotelData.roomTypes.map((room) =>
                room.id === record.id ? updatedRoomData : room
            );

            // Gọi API để cập nhật khách sạn
            const response = await editHotel(record.hotelId, { roomTypes: updatedRoomTypes });
            if (response) {
                setIsShowModal(false);
                messageApi.open({
                    type: "success",
                    content: "Sửa đổi thành công",
                });
                reLoad();
            } else {
                throw new Error(response?.message || "Sửa đổi thất bại");
            }
        } catch (error) {
            setIsShowModal(false);
            messageApi.open({
                type: "error",
                content: error.message || "Sửa đổi thất bại",
            });
        }
    };

    return (
        <>
            {contextHolder}
            <Button type="primary" icon={<EditOutlined />} onClick={showModal}></Button>

            <Modal title="Sửa thông tin phòng" open={isShowModal} onCancel={handleCancel} footer={null}>
                <Form
                    onFinish={handleSubmit}
                    layout="vertical"
                    form={form}
                    initialValues={{
                        hotelId: record?.hotelId,
                        name: record?.name,
                        quantityBed: record?.quantityBed,
                        quantityPeople: record?.quantityPeople,
                        roomArea: record?.roomArea,
                        price: record?.price,
                        availableRooms: record?.availableRooms,
                        amenities: record?.amenities?.map(a => a.id) || [],
                    }}
                >
                    <Row gutter={[20, 20]}>
                        <Col span={24} xxl={12} xl={12} lg={12} md={24}>
                            <Form.Item label="Khách sạn" name="hotelId">
                                <Input disabled />
                            </Form.Item>
                        </Col>
                        <Col span={24} xxl={12} xl={12} lg={12} md={24}>
                            <Form.Item label="Tên phòng" name="name" rules={rules}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24} xxl={12} xl={12} lg={12} md={24}>
                            <Form.Item label="Số lượng giường" name="quantityBed" rules={rules}>
                                <InputNumber min={1} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={24} xxl={12} xl={12} lg={12} md={24}>
                            <Form.Item label="Số người tối đa" name="quantityPeople" rules={rules}>
                                <InputNumber min={1} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={24} xxl={12} xl={12} lg={12} md={24}>
                            <Form.Item label="Diện tích phòng (m²)" name="roomArea" rules={rules}>
                                <InputNumber min={1} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={24} xxl={12} xl={12} lg={12} md={24}>
                            <Form.Item label="Giá (VND)" name="price" rules={priceRules}>
                                <InputNumber min={1} step={1000} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={24} xxl={12} xl={12} lg={12} md={24}>
                            <Form.Item label="Số phòng khả dụng" name="availableRooms" rules={rules}>
                                <InputNumber min={0} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label="Tiện ích" name="amenities" rules={rules}>
                                <Select mode="multiple" placeholder="Chọn tiện ích" allowClear>
                                    {availableAmenities.map((amenity) => (
                                        <Option key={amenity.id} value={amenity.name}>
                                            {amenity.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Cập nhật
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
}

export default EditRoom;