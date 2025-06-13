import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { getHotelByID } from '../../Service/HotelService';
import { getUserById } from '../../Service/UserServices';
import { getRoomById } from '../../Service/RoomService';


export const exportBookingsToExcel = async (bookings) => {
  if (!bookings || bookings.length === 0) {
    alert('Không có dữ liệu để xuất');
    return;
  }

  // Lấy thông tin chi tiết từng booking (hotelName, fullName,...)
  const enrichedBookings = await Promise.all(
    bookings.map(async (b) => {
      const hotel = await getHotelByID(b.hotelId);
      const user = await getUserById(b.userId);
      const room = await getRoomById(b.roomTypeId)

      return {
        ID: b.id,
        'Khách hàng': user.user?.name || 'N/A',
        'Email': user.user?.email || 'N/A',
        'Số điện thoại': user.user?.phoneNumber || 'N/A',
        'Khách sạn': hotel.hotelList[0]?.name || 'N/A',
        'Loại phòng': room.room.name || 'N/A',
        'Ngày đến': b.checkInDate || 'N/A',
        'Ngày đi': b.checkOutDate || 'N/A',
        'Trạng thái': b.status || 'N/A',
      };
    })
  );

  // Tạo file Excel
  const worksheet = XLSX.utils.json_to_sheet(enrichedBookings);
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
