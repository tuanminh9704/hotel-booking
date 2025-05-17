import { Col, Row } from 'antd';
import './grid.scss';
import MultiLine from '../MultiLine';
import DemoRadar from '../Radar';
import { useState, useEffect } from 'react';
import { getAdditionalStats, getBookings, getFeedback, getNotifications, getRooms, getStats } from '../../Service/DashboardService';

const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="stats-card col">
      <div className="stats-icon">{icon}</div>
      <div>
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
};

const BookingTable = ({ bookings }) => {
  return (
    <div className="booking-table col box-8">
      <h3>Đặt phòng gần đây</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Khách hàng</th>
            <th>Phòng</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {bookings.slice(0, 3).map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.fullName || booking.customer}</td>
              <td>{booking.room || 'N/A'}</td>
              <td>{booking.date ? booking.date[0] : 'N/A'}</td>
              <td>{booking.date ? booking.date[1] : 'N/A'}</td>
              <td>
                <span
                  className={`status ${
                    booking.status === 'Confirmed'
                      ? 'status-confirmed'
                      : booking.status === 'Pending'
                      ? 'status-pending'
                      : 'status-cancelled'
                  }`}
                >
                  {booking.status || 'N/A'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AvailableRooms = ({ rooms }) => {
  return (
    <div className="available-rooms col box-7">
      <h3>Phòng trống</h3>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            Phòng {room.id} - {room.type} 
          </li>
        ))}
      </ul>
    </div>
  );
};

const FeedbackSummary = ({ feedbackCount }) => {
  return (
    <div className="feedback-summary col box-9">
      <h3>Phản hồi khách hàng</h3>
      <p>{feedbackCount} phản hồi mới cần xử lý.</p>
    </div>
  );
};

const Notifications = ({ notificationCount }) => {
  return (
    <div className="notifications col box-10">
      <h3>Thông báo</h3>
      <p>{notificationCount} thông báo mới.</p>
    </div>
  );
};

const AdditionalStats = ({ cancellationRate, occupancyRate }) => {
  return (
    <div className="additional-stats col box-11">
      <h3>Thống kê bổ sung</h3>
      <p>Tỷ lệ hủy phòng: {cancellationRate}%</p>
      <p>Tỷ lệ chiếm dụng: {occupancyRate}%</p>
    </div>
  );
};

function LearnGrid() {
  const [data, setData] = useState({
    stats: { totalBookings: 0, revenue: 0, newCustomers: 0 },
    bookings: [],
    rooms: [],
    feedback: { newFeedbackCount: 0 },
    notifications: { newNotificationCount: 0 },
    additionalStats: { cancellationRate: 0, occupancyRate: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [stats, bookings, rooms, feedback, notifications, additionalStats] = await Promise.all([
          getStats(),
          getBookings(),
          getRooms(),
          getFeedback(),
          getNotifications(),
          getAdditionalStats(),
        ]);

        setData({ stats, bookings, rooms, feedback, notifications, additionalStats });
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log('Dữ liệu sau khi fetch:', data);

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="dashboard">
      <main className="dashboard-main">
        <Row gutter={[20, 25]}>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <StatsCard title="Tổng đặt phòng" value={data.stats.totalBookings} icon="📋" />
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <StatsCard title="Doanh thu" value={`$${data.stats.revenue}`} icon="💰" />
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <StatsCard title="Khách hàng mới" value={data.stats.newCustomers} icon="👥" />
          </Col>
          <Col xxl={16} xl={16} lg={16} md={24} sm={24} xs={24}>
            <div className="col box-5">
              <MultiLine data={data.bookings} />
            </div>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
            <div className="col box-6">
              <DemoRadar data={data.bookings} />
            </div>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
            <AvailableRooms rooms={data.rooms} />
          </Col>
          <Col xxl={16} xl={16} lg={16} md={24} sm={24} xs={24}>
            <BookingTable bookings={data.bookings} />
          </Col>
          <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
            <FeedbackSummary feedbackCount={data.feedback.newFeedbackCount} />
          </Col>
          <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
            <Notifications notificationCount={data.notifications.newNotificationCount} />
          </Col>
          <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
            <AdditionalStats
              cancellationRate={data.additionalStats.cancellationRate}
              occupancyRate={data.additionalStats.occupancyRate}
            />
          </Col>
        </Row>
      </main>
    </div>
  );
}

export default LearnGrid;