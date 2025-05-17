import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Typography, Row, Col, Form, Input, Checkbox, Alert } from 'antd';
import { format, isValid } from 'date-fns';
import { getHotelByID } from '../../Service/HotelService';
import './Payment.scss';
import { bookRoom } from '../../Service/BookRoomService';


const { Text } = Typography;

function Payment() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();
    const [agreePolicy, setAgreePolicy] = useState(false);
    const [hotel, setHotel] = useState(null);
    const [error, setError] = useState(''); // Biến error được giữ lại và sẽ sử dụng

    const bookingData = location.state?.bookingData;

    const hotelId = bookingData?.hotelId?.trim();
    const roomTypeId = bookingData?.roomTypeId?.trim();
    const date = bookingData?.date;
    const currency = 'VND';

    const formattedDate = bookingData && Array.isArray(date) && date.length === 2
    ? (() => {
        const start = new Date(date[0]);
        const end = new Date(date[1]);
        if (isValid(start) && isValid(end)) {
            return `${format(start, 'dd/MM/yyyy')} - ${format(end, 'dd/MM/yyyy')}`;
        } else {
            return 'Không xác định';
        }
    })()
    : 'Không xác định';

    const handlePayment = async (values) => {

        const fetchAPI = async (option) => {
            const response = await bookRoom(option);
            if(response) {
                alert("đặt phòng thành công")
            }
        }

        if (!agreePolicy) {
            setError('Vui lòng đồng ý với các điều khoản và chính sách.');
            return;
        }

        setError('');
        setIsLoading(true);
        try {
            console.log('Thông tin thanh toán:', { ...bookingData, ...values });
            fetchAPI({ ...bookingData, ...values });
            navigate('/', { state: { bookingData, guestInfo: values } });
        } catch (error) {
            setError('Thanh toán thất bại. Vui lòng thử lại.');
            console.error('Lỗi thanh toán:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchAPI = async () => {
            if (!hotelId) return;
            try {
                const responseHotel = await getHotelByID(hotelId);
                setHotel(responseHotel);
            } catch (error) {
                setError('Lỗi khi lấy thông tin khách sạn.');
                console.error('Lỗi API:', error);
            }
        };

        fetchAPI();
    }, [hotelId]);

    if (!bookingData) {
        return (
            <Row justify="center" style={{ padding: '20px', minHeight: '100vh' }}>
                <Col xs={24} sm={20} md={16} lg={12}>
                    <Alert message="Không có dữ liệu đặt phòng." type="error" showIcon />
                </Col>
            </Row>
        );
    }

    return (
        <>
            <header className='header-payment'><h1>HotelBooking.com</h1></header>
            <main className='main-payment'>
                <Row className='row-container'>
                    <Col span={24} className='title'>
                        <h1>Thanh Toán Đặt Phòng</h1>
                    </Col>
                    <Col xxl={8} xl={8} lg={8} md={24} sm={24} span={24} className='info'>
                        <Card className="info-card" title="Thông tin đặt phòng">
                            <Text>Tên khách sạn: </Text>
                            <Text strong>{hotel ? hotel.name || 'Không xác định' : 'Đang tải...'}</Text>
                            <br />
                            <br />
                            <Text>Loại phòng: </Text>
                            <Text strong>{hotel && hotel.roomTypes ? hotel.roomTypes.find(r => r.id === roomTypeId)?.name || 'Không xác định' : 'Đang tải...'}</Text>
                            <br />
                            <br />
                            <Text>Ngày đặt: </Text>
                            <Text strong>{formattedDate}</Text>
                            <br />
                            <br />
                            <Text>Giá: </Text>
                            <Text strong>{hotel && hotel.roomTypes ? hotel.roomTypes.find(r => r.id === roomTypeId)?.price || 'Không xác định' : 'Đang tải...'} {currency}</Text>
                        </Card>
                        <br />
                        <Card className="info-card" title="Thời gian">
                            <Text>Check in: </Text>
                            <Text strong>{hotel ? hotel.checkInTime || 'Không có thông tin' : 'Đang tải...'}</Text>
                            <br />
                            <br />
                            <Text>Check out: </Text>
                            <Text strong>{hotel ? hotel.checkOutTime || 'Không có thông tin' : 'Đang tải...'}</Text>
                        </Card>
                    </Col>
                    <Col xxl={16} xl={16} lg={16} md={24} sm={24} span={24} className='user'>
                        <Card className="form-card info-card" title="Thông tin khách hàng">
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={handlePayment}
                                requiredMark={false}
                            >
                                <Form.Item
                                    label="Họ và tên"
                                    name="fullName"
                                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                                >
                                    <Input placeholder="Nhập họ và tên" size="large" />
                                </Form.Item>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập email' },
                                        { type: 'email', message: 'Email không hợp lệ' },
                                    ]}
                                >
                                    <Input placeholder="Nhập email" size="large" />
                                </Form.Item>
                                <Form.Item
                                    label="Số điện thoại"
                                    name="phone"
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập số điện thoại' },
                                        { pattern: /^[0-9]{10,12}$/, message: 'Số điện thoại không hợp lệ' },
                                    ]}
                                >
                                    <Input placeholder="Nhập số điện thoại" size="large" />
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                    <Col className='submit'>
                        {error && (
                            <Alert
                                message={error}
                                type="error"
                                showIcon
                                style={{ marginBottom: '16px' }}
                                closable
                                onClose={() => setError('')}
                            />
                        )}
                        <Card className="policy-card">
                            <Checkbox
                                checked={agreePolicy}
                                onChange={(e) => setAgreePolicy(e.target.checked)}
                            >
                                Tôi đồng ý với <a href="/terms" target="_blank">Điều khoản dịch vụ</a> và{' '}
                                <a href="/privacy" target="_blank">Chính sách bảo mật</a>
                            </Checkbox>
                        </Card>
                        <br />
                        <Button
                            type='primary'
                            size="large"
                            onClick={() => form.submit()}
                            loading={isLoading}
                            disabled={isLoading || !agreePolicy}
                        >
                            {isLoading ? 'Đang xử lý...' : 'Thanh Toán Ngay'}
                        </Button>
                    </Col>
                </Row>
            </main>
            <footer className='footer-payment'>2025 copyright @Nhom5</footer>
        </>
    );
}

export default Payment;