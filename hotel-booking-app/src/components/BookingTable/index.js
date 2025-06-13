import { useState, useEffect } from 'react';
import { getHotelByID } from '../../Service/HotelService';
import { getUserById } from '../../Service/UserServices';


const BookingTable = ({ bookings }) => {
  const [hotelMap, setHotelMap] = useState({});
  const [userMap, setUserMap] = useState({});

  useEffect(() => {
    const fetchHotelsAndUsers = async () => {
      const uniqueHotelIds = [...new Set(bookings.map(b => b.hotelId))];
      const uniqueUserIds = [...new Set(bookings.map(b => b.userId))];

      // Lấy danh sách khách sạn
      const hotelEntries = await Promise.all(
        uniqueHotelIds.map(async (id) => {
          const hotel = await getHotelByID(id);
          return [id, hotel.hotelList?.[0]];
        })
      );

      // Lấy danh sách người dùng
      const userEntries = await Promise.all(
        uniqueUserIds.map(async (id) => {
          const user = await getUserById(id);
          return [id, user.user];
        })
      );

      setHotelMap(Object.fromEntries(hotelEntries));
      setUserMap(Object.fromEntries(userEntries));
    };

    fetchHotelsAndUsers();
  }, [bookings]);

  const parseDate = (dateStr) => new Date(dateStr);

  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = parseDate(a.checkInDate);
    const dateB = parseDate(b.checkInDate);
    return dateB - dateA;
  });

  const data = sortedBookings.slice(0, 10);

  return (
    <div className="booking-table col box-8">
      <h3>Đặt phòng gần đây</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Khách hàng</th>
            <th>Khách sạn</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {data.map((booking) => {
            const hotel = hotelMap[booking.hotelId];
            const user = userMap[booking.userId];
            const status = booking.status?.toLowerCase();

            return (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{user?.fullName || user?.name || 'Đang tải...'}</td>
                <td>{hotel?.name || 'Đang tải...'}</td>
                <td>{booking.checkInDate || 'N/A'}</td>
                <td>{booking.checkOutDate || 'N/A'}</td>
                <td>
                  <span
                    className={`status ${
                      status === 'confirmed'
                        ? 'status-confirmed'
                        : status === 'pending'
                        ? 'status-pending'
                        : 'status-cancelled'
                    }`}
                  >
                    {status?.charAt(0).toUpperCase() + status?.slice(1) || 'N/A'}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
