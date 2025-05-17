import React, { useState, useEffect } from 'react';
import { getHotelByID } from '../../Service/HotelService';

const BookingTable = ({ bookings }) => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      const data = bookings.slice(0, 10);
      const hotelsData = await Promise.all(data.map(b => getHotelByID(b.hotelId)));
      setHotels(hotelsData);
    };

    fetchHotels();
  }, [bookings]);

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  };
  
  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = parseDate(a.date?.[0] || '01/01/1970');
    const dateB = parseDate(b.date?.[0] || '01/01/1970');
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
          {data.map((booking, index) => {
            const hotel = hotels[index];
            return (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.fullName || booking.customer}</td>
                <td>{hotel ? hotel.name : 'Đang tải...'}</td>
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
