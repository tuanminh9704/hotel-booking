import { Button, Col, Row } from 'antd';
import './grid.scss';
import MultiLine from '../MultiLine';
import DemoRadar from '../Radar';
import { useState, useEffect } from 'react';
import { getAdditionalStats, getBookings, getFeedback, getNotifications, getRooms, getStats } from '../../Service/DashboardService';
import BookingTable from '../BookingTable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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

const AdditionalStats = ({ bookings }) => {
  if (!bookings || bookings.length === 0) {
    return (
      <div className="additional-stats col box-11">
        <h3>Thống kê bổ sung</h3>
        <p>Tỷ lệ hủy phòng: 0 %</p>
        <p>Tỷ lệ chiếm dụng: 0 %</p>
        <p>Tỷ lệ thành công: 0 %</p>
      </div>
    );
  }

  const total = bookings.length;
  const cancelled = bookings.filter(b => b.status === 'Cancelled').length;
  const confirmed = bookings.filter(b => b.status === 'Confirmed').length;

  const cancelRate = ((cancelled / total) * 100).toFixed(1);
  const occupancyRate = ((confirmed / total) * 100).toFixed(1);
  const successRate = occupancyRate; // Hoặc bạn có thể tính theo logic khác nếu cần

  return (
    <div className="additional-stats col box-11">
      <h3>Thống kê bổ sung</h3>
      <Row gutter={[20]}>
        <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24} ><h3>Tỷ lệ hủy phòng: {cancelRate} %</h3></Col>
        <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24} ><h3>Tỷ lệ chiếm dụng: {occupancyRate} %</h3></Col>
        <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24} ><h3>Tỷ lệ thành công: {successRate} %</h3></Col>
      </Row>
    </div>
  );
};

const exportBookingsToExcel = (bookings) => {
    console.log(bookings);
    

  if (!bookings || bookings.length === 0) {
    alert('Không có dữ liệu để xuất');
    return;
  }

  // Chuyển đổi dữ liệu sang định dạng Excel-friendly
  const excelData = bookings.map((b) => ({
    ID: b.id,
    'Khách hàng': b.fullName || 'N/A',
    Email: b.email || 'N/A',
    'Số điện thoại': b.phone || 'N/A',
    'Khách sạn': b.hotelId || 'N/A',
    'Loại phòng': b.roomTypeId || 'N/A',
    'Ngày đến': b.date?.[0] || 'N/A',
    'Ngày đi': b.date?.[1] || 'N/A',
    'Trạng thái': b.status || 'N/A',
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Đặt phòng');

  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });

  const blob = new Blob([excelBuffer], {
    type: 'application/octet-stream',
  });

  saveAs(blob, `danh_sach_dat_phong_${new Date().toISOString().slice(0, 10)}.xlsx`);
};


function Grid() {
  const [data, setData] = useState({
    stats: { totalBookings: 0, revenue: 0, newCustomers: 0 },
    bookings: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [stats, bookings ] = await Promise.all([
          getStats(),
          getBookings(),
        ]);

        setData({ stats, bookings });
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="dashboard">
      <main className="dashboard-main">
        <Row gutter={[20, 25]}>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <StatsCard title="Tổng đặt phòng" value={data.stats.totalBookings} icon="📋" />
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <StatsCard title="Doanh thu" value={`${data.stats.revenue.toLocaleString('vi-VN')} VND`} icon="💰" />
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
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <BookingTable bookings={data.bookings} />
          </Col>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <AdditionalStats
              bookings={data.bookings}
            />
          </Col>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Button type='primary' size='large' onClick={() => exportBookingsToExcel(data.bookings)}>
              <h3>Xuất báo cáo đặt phòng</h3>
            </Button>
            <span>(File Excel)</span>
          </Col>
        </Row>
      </main>
    </div>
  );
}

export default Grid;