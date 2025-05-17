import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const DemoRadar = ({ bookings, hotels }) => {
  // Tính tỷ lệ đặt phòng theo tỉnh (Hà Nội, Đà Nẵng, TP Hồ Chí Minh)
  const calculateBookingRatesByProvince = (bookings, hotels) => {
    if (!bookings || !hotels || bookings.length === 0) {
      return { labels: ['Hà Nội', 'Đà Nẵng', 'TP Hồ Chí Minh'], data: [0, 0, 0] };
    }

    // Đếm số booking theo tỉnh
    const bookingCountByProvince = {
      'Hà Nội': 0,
      'Đà Nẵng': 0,
      'TP Hồ Chí Minh': 0,
    };

    // Lọc và đếm booking theo tỉnh
    bookings.forEach((booking) => {
      const hotel = hotels.find((h) => h.id === booking.roomId);
      if (!hotel) return;

      const address = hotel.address || '';
      if (address.includes('Hà Nội')) {
        bookingCountByProvince['Hà Nội'] += 1;
      } else if (address.includes('Đà Nẵng')) {
        bookingCountByProvince['Đà Nẵng'] += 1;
      } else if (address.includes('TP. Hồ Chí Minh') || address.includes('TP Hồ Chí Minh')) {
        bookingCountByProvince['TP Hồ Chí Minh'] += 1;
      }
    });

    const totalBookings = bookings.length;
    const labels = ['Hà Nội', 'Đà Nẵng', 'TP Hồ Chí Minh'];
    const data = labels.map((province) =>
      totalBookings > 0 ? Math.round((bookingCountByProvince[province] / totalBookings) * 100) : 0
    );

    return { labels, data };
  };

  const { labels, data } = calculateBookingRatesByProvince(bookings, hotels);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Tỷ lệ đặt phòng (%)',
        data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Tỷ lệ đặt phòng theo tỉnh',
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  return <Radar data={chartData} options={options} />;
};

export default DemoRadar;