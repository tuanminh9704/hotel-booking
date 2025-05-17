import { Col, Form, Row, Input, Button, InputNumber, Select, Tabs, Upload, TimePicker, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './CreateRoom.scss';
import { createHotel, getHotelByID, getHotels } from '../../Service/HotelService';
import { editHotel } from '../../Service/RoomService';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const { Option } = Select;
const { TabPane } = Tabs;

function CreateRoom() {
  const [formHotel] = Form.useForm();
  const [formRoom] = Form.useForm();
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isLoadingHotel, setIsLoadingHotel] = useState(false);
  const [isLoadingRoom, setIsLoadingRoom] = useState(false);

  // Danh sách tiện ích mẫu
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

  // Danh sách dịch vụ mẫu
  const availableServices = [
    'Xe đưa đón sân bay',
    'Phòng gia đình',
    'Phòng không hút thuốc',
    'Chỗ đỗ xe miễn phí',
    'Lễ tân 24 giờ',
    'Sân thượng / hiên',
    'Dịch vụ phòng',
    'Thang máy',
    'Giặt ủi',
    'Spa & massage',
    'Phòng gym',
    'Hồ bơi ngoài trời',
    'Cho thuê xe máy / ô tô',
    'Dịch vụ giữ hành lý',
    'Quầy tour du lịch',
    'Bữa sáng tại phòng',
    'Trợ giúp đặc biệt (concierge)',
    'Dịch vụ trông trẻ',
    'Wi-Fi miễn phí toàn khách sạn',
    'Dọn phòng hàng ngày',
  ];

  // Tải danh sách khách sạn từ HotelService
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await getHotels();
        const hotelList = Array.isArray(response) ? response : response.data || [];
        setHotels(hotelList.map(item => ({ id: item.id, name: item.name })));
      } catch (error) {
        console.error('Lỗi khi tải danh sách khách sạn:', error);
        message.error('Không thể tải danh sách khách sạn');
      }
    };
    fetchHotels();
  }, []);

  const rules = [
    {
      required: true,
      message: 'Vui lòng nhập thông tin này!',
    },
  ];

  const urlRule = [
    {
      type: 'url',
      message: 'Vui lòng nhập URL hợp lệ!',
    },
  ];

  const handleNormFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleCreateHotel = async (values) => {
    setIsLoadingHotel(true);
    const hotelData = {
      id: `hotel-${Date.now()}`,
      name: values.name,
      thumbnail: values.thumbnail?.[0]?.response?.url || '',
      address: values.address,
      linkMap: values.linkMap || '',
      description: values.description || '',
      rate: values.rate || 0,
      checkInTime: values.checkInTime ? dayjs(values.checkInTime).format('HH:mm') : '',
      checkOutTime: values.checkOutTime ? dayjs(values.checkOutTime).format('HH:mm') : '',
      service: values.service || [],
      images: values.images?.map((file) => file.response?.url || file.url) || [],
      roomTypes: [],
    };

    try {
      const response = await createHotel(hotelData);
      if (response) {
        setHotels([...hotels, { id: hotelData.id, name: hotelData.name }]);
        setSelectedHotel(hotelData.id);
        message.success('Thêm khách sạn thành công');
        formHotel.resetFields();
      } else {
        message.error(`Thêm khách sạn thất bại: ${response.message || 'Lỗi không xác định'}`);
      }
    } catch (error) {
      console.error('Lỗi khi tạo khách sạn:', error);
      message.error(`Lỗi hệ thống: ${error.message}`);
    } finally {
      setIsLoadingHotel(false);
    }
  };

  const handleCreateRoom = async (values) => {
    if (!selectedHotel) {
      message.warning('Vui lòng chọn khách sạn trước!');
      return;
    }

    setIsLoadingRoom(true);
    const roomData = {
      id: `${selectedHotel}-${Date.now()}`,
      name: values.name,
      quantityBed: values.quantityBed,
      quantityPeople: values.quantityPeople,
      roomArea: values.roomArea,
      price: values.price,
      availableRooms: values.availableRooms,
      amenities: values.amenities.map((amenityId) => ({
        id: `amenity-${Date.now()}-${amenityId}`,
        name: availableAmenities.find((a) => a.id === amenityId)?.name || amenityId,
        roomTypeId: `${selectedHotel}-${Date.now()}`,
      })),
      hotelId: selectedHotel,
    };

    try {
      // Lấy dữ liệu khách sạn hiện tại
      const hotelResponse = await getHotelByID(selectedHotel);
      const hotelData = hotelResponse.data || hotelResponse;
      
      // Thêm roomData vào mảng roomTypes hiện tại
      const updatedRoomTypes = [...(hotelData.roomTypes || []), roomData];
      
      // Cập nhật khách sạn với roomTypes mới
      const response = await editHotel(selectedHotel, { roomTypes: updatedRoomTypes });
      if (response) {
        message.success('Thêm phòng thành công');
        formRoom.resetFields();
        // Làm mới danh sách khách sạn
        const updatedHotels = await getHotels();
        setHotels((Array.isArray(updatedHotels) ? updatedHotels : updatedHotels.data || []).map(item => ({ id: item.id, name: item.name })));
      } else {
        message.error(`Thêm phòng thất bại: ${response.message || 'Lỗi không xác định'}`);
      }
    } catch (error) {
      console.error('Lỗi khi tạo phòng:', error);
      message.error(`Lỗi hệ thống: ${error.message}`);
    } finally {
      setIsLoadingRoom(false);
    }
  };

  // Xử lý phản hồi từ server khi upload
  const handleUploadChange = ({ file }) => {
    if (file.status === 'done') {
      message.success(`${file.name} tải lên thành công!`);
    } else if (file.status === 'error') {
      message.error(`${file.name} tải lên thất bại: ${file.error?.message || 'Lỗi không xác định'}`);
    }
  };

  return (
    <>
      <h2>Quản lý khách sạn và phòng</h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Thêm khách sạn mới" key="1">
          <Form onFinish={handleCreateHotel} layout="vertical" form={formHotel}>
            <Row gutter={[20, 20]}>
              <Col span={24} xxl={12} xl={12} lg={12} md={24}>
                <Form.Item label="Tên khách sạn" name="name" rules={rules}>
                  <Input placeholder="Ví dụ: Ocean Breeze Hotel" />
                </Form.Item>
              </Col>
              <Col span={24} xxl={12} xl={12} lg={12} md={24}>
                <Form.Item
                  label="Hình ảnh đại diện"
                  name="thumbnail"
                  valuePropName="fileList"
                  getValueFromEvent={handleNormFile}
                  rules={[{ required: false }]}
                >
                  <Upload
                    name="file" // Phải khớp với field name mà backend mong đợi
                    action="http://localhost:5000/api/upload" // Thay bằng URL của server
                    listType="picture"
                    maxCount={1}
                    onChange={handleUploadChange}
                  >
                    <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Địa chỉ" name="address" rules={rules}>
                  <Input placeholder="Ví dụ: 88 Đường Biển, Đà Nẵng, Việt Nam" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Link bản đồ"
                  name="linkMap"
                  rules={[{ required: false }, ...urlRule]}
                >
                  <Input placeholder="Ví dụ: https://www.google.com/maps/..." />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Mô tả"
                  name="description"
                  rules={[{ required: false }]}
                >
                  <Input.TextArea
                    showCount
                    maxLength={2000}
                    placeholder="Mô tả chi tiết về khách sạn"
                    autoSize={{ minRows: 4, maxRows: 6 }}
                  />
                </Form.Item>
              </Col>
              {/* Đặt Đánh giá, Giờ check-in, Giờ check-out trên cùng một dòng */}
              <Col span={24}>
                <Row gutter={[20, 20]}>
                  <Col span={24} xxl={8} xl={8} lg={8} md={24}>
                    <Form.Item label="Đánh giá" name="rate" rules={rules}>
                      <InputNumber
                        min={0}
                        max={5}
                        step={0.1}
                        placeholder="Ví dụ: 5.0"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24} xxl={8} xl={8} lg={8} md={24}>
                    <Form.Item
                      label="Giờ check-in"
                      name="checkInTime"
                      rules={[{ required: false }]}
                    >
                      <TimePicker
                        format="HH:mm"
                        placeholder="Chọn giờ"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24} xxl={8} xl={8} lg={8} md={24}>
                    <Form.Item
                      label="Giờ check-out"
                      name="checkOutTime"
                      rules={[{ required: false }]}
                    >
                      <TimePicker
                        format="HH:mm"
                        placeholder="Chọn giờ"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Dịch vụ"
                  name="service"
                  rules={[{ required: false }]}
                >
                  <Select mode="multiple" placeholder="Chọn dịch vụ" allowClear>
                    {availableServices.map((service) => (
                      <Option key={service} value={service}>
                        {service}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Hình ảnh khách sạn"
                  name="images"
                  valuePropName="fileList"
                  getValueFromEvent={handleNormFile}
                  rules={[{ required: false }]}
                >
                  <Upload
                    name="file" // Phải khớp với field name mà backend mong đợi
                    action="http://localhost:5000/api/upload" // Thay bằng URL của server
                    listType="picture"
                    multiple
                    onChange={handleUploadChange}
                  >
                    <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoadingHotel}
                  >
                    Tạo khách sạn
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </TabPane>
        <TabPane tab="Thêm phòng mới" key="2">
          <Form onFinish={handleCreateRoom} layout="vertical" form={formRoom}>
            <Row gutter={[20, 20]}>
              <Col span={24} xxl={12} xl={12} lg={12} md={24}>
                <Form.Item label="Khách sạn" name="hotelId" rules={rules}>
                  <Select
                    placeholder="Chọn khách sạn"
                    onChange={(value) => setSelectedHotel(value)}
                    allowClear
                  >
                    {hotels.map((hotel) => (
                      <Option key={hotel.id} value={hotel.id}>
                        {hotel.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24} xxl={12} xl={12} lg={12} md={24}>
                <Form.Item label="Tên phòng" name="name" rules={rules}>
                  <Input placeholder="Ví dụ: Phòng Ocean View" />
                </Form.Item>
              </Col>
              <Col span={24} xxl={12} xl={12} lg={12} md={24}>
                <Form.Item label="Số lượng giường" name="quantityBed" rules={rules}>
                  <InputNumber min={1} placeholder="Ví dụ: 1" />
                </Form.Item>
              </Col>
              <Col span={24} xxl={12} xl={12} lg={12} md={24}>
                <Form.Item
                  label="Số người tối đa"
                  name="quantityPeople"
                  rules={rules}
                >
                  <InputNumber min={1} placeholder="Ví dụ: 2" />
                </Form.Item>
              </Col>
              <Col span={24} xxl={12} xl={12} lg={12} md={24}>
                <Form.Item
                  label="Diện tích phòng (m²)"
                  name="roomArea"
                  rules={rules}
                >
                  <InputNumber min={1} placeholder="Ví dụ: 45" />
                </Form.Item>
              </Col>
              <Col span={24} xxl={12} xl={12} lg={12} md={24}>
                <Form.Item
                  label="Giá (VND)"
                  name="price"
                  rules={[
                    { required: true, message: 'Vui lòng nhập giá!' },
                    {
                      type: 'number',
                      min: 0,
                      message: 'Giá phải lớn hơn hoặc bằng 0!',
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    step={1000}
                    placeholder="Ví dụ: 1450000"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={24} xxl={12} xl={12} lg={12} md={24}>
                <Form.Item
                  label="Số phòng khả dụng"
                  name="availableRooms"
                  rules={rules}
                >
                  <InputNumber min={0} placeholder="Ví dụ: 5" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Tiện ích" name="amenities" rules={rules}>
                  <Select mode="multiple" placeholder="Chọn tiện ích" allowClear>
                    {availableAmenities.map((amenity) => (
                      <Option key={amenity.id} value={amenity.id}>
                        {amenity.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoadingRoom}
                  >
                    Tạo phòng
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </TabPane>
      </Tabs>
    </>
  );
}

export default CreateRoom;