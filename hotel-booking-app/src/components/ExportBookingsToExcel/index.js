import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportBookingsToExcel = (bookings) => {
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
