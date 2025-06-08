package com.example.hotelbookingserver.utils;

import java.security.SecureRandom;
import java.util.List;
import java.util.stream.Collectors;

import com.example.hotelbookingserver.dtos.BookingDTO;
import com.example.hotelbookingserver.dtos.RoomTypeDTO;
import com.example.hotelbookingserver.dtos.UserDTO;
import com.example.hotelbookingserver.entities.Booking;
import com.example.hotelbookingserver.entities.RoomType;
import com.example.hotelbookingserver.entities.User;

public class Utils {

    private static final String ALPHANUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final SecureRandom secureRandom = new SecureRandom();

    public static String generateRandomConfirmationCode(int length) {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(ALPHANUMERIC_STRING.length());
            char randomChar = ALPHANUMERIC_STRING.charAt(randomIndex);
            stringBuilder.append(randomChar);
        }
        return stringBuilder.toString();
    }

    public static UserDTO mapUserEntityToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setRole(user.getRole());
        return userDTO;
    }

    public static List<UserDTO> mapUserListEntityToUserListDTO(List<User> userList) {
        if (userList == null) {
            return List.of();
        }
        return userList.stream()
                .map(Utils::mapUserEntityToUserDTO)
                .collect(Collectors.toList());
    }

    public static UserDTO mapUserEntityToUserDTOPlusUserBookingsAndRoom(User user) {
        if (user == null) {
            return null;
        }

        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setRole(user.getRole());

        if (user.getBookings() != null && !user.getBookings().isEmpty()) {
            userDTO.setBookings(user.getBookings().stream()
                    .map(booking -> {
                        BookingDTO bookingDTO = new BookingDTO();
                        bookingDTO.setId(booking.getId());
                        bookingDTO.setCheckInDate(booking.getCheckInDate());
                        bookingDTO.setCheckOutDate(booking.getCheckOutDate());
                        bookingDTO.setBookingConfirmationCode(booking.getBookingConfirmationCode());

                        // Set các thông tin liên quan phòng (roomType) nếu có
                        if (booking.getRoomType() != null) {
                            bookingDTO.setRoomTypeId(booking.getRoomType().getId());
                            bookingDTO.setRoomTypeName(booking.getRoomType().getName());
                        }

                        // Set thông tin userId và userFullName từ User entity
                        bookingDTO.setUserId(user.getId());
                        bookingDTO.setUserFullName(user.getName());

                        // Nếu booking có hotel, bạn có thể set hotelId, hotelName tương tự
                        // bookingDTO.setHotelId(...)
                        // bookingDTO.setHotelName(...)

                        // Set trạng thái nếu có
                        bookingDTO.setStatus(booking.getStatus());

                        // Có thể set createdAt, updatedAt nếu kiểu String hoặc format theo ý bạn
                        // bookingDTO.setCreatedAt(...)
                        // bookingDTO.setUpdatedAt(...)

                        return bookingDTO;
                    })
                    .collect(Collectors.toList()));
        }

        return userDTO;
    }

    public static RoomTypeDTO mapRoomEntityToRoomTypeDTO(RoomType room) {
        RoomTypeDTO roomTypeDTO = new RoomTypeDTO();
        roomTypeDTO.setId(room.getId());
        roomTypeDTO.setPrice(room.getPrice());
        roomTypeDTO.setRoomArea(room.getRoomArea());
        roomTypeDTO.setQuantityBed(room.getQuantityBed());
        roomTypeDTO.setQuantityPeople(room.getQuantityPeople());
        roomTypeDTO.setName(room.getName());
        return roomTypeDTO;
    }

    public static BookingDTO mapBookingEntityToBookingDTO(Booking booking) {
        BookingDTO bookingDTO = new BookingDTO();
        bookingDTO.setId(booking.getId());
        bookingDTO.setCheckInDate(booking.getCheckInDate());
        bookingDTO.setCheckOutDate(booking.getCheckOutDate());
        bookingDTO.setBookingConfirmationCode(booking.getBookingConfirmationCode());
        bookingDTO.setStatus(booking.getStatus());
        bookingDTO.setCreatedAt(booking.getCreatedAt() != null ? booking.getCreatedAt().toString() : null);
        bookingDTO.setUpdatedAt(booking.getUpdatedAt() != null ? booking.getUpdatedAt().toString() : null);

        if (booking.getUser() != null) {
            bookingDTO.setUserId(booking.getUser().getId());
            bookingDTO.setUserFullName(booking.getUser().getName());
        }

        if (booking.getRoomType() != null) {
            bookingDTO.setRoomTypeId(booking.getRoomType().getId());
            bookingDTO.setRoomTypeName(booking.getRoomType().getName());
        }

        if (booking.getHotel() != null) {
            bookingDTO.setHotelId(booking.getHotel().getId());
            bookingDTO.setHotelName(booking.getHotel().getName());
        }

        return bookingDTO;
    }

    public static List<BookingDTO> mapBookingListEntityToBookingListDTO(List<Booking> bookingList) {
        return bookingList.stream()
                .map(Utils::mapBookingEntityToBookingDTO)
                .collect(Collectors.toList());
    }

    // Các hàm map khác giữ nguyên hoặc sửa tương tự nếu cần
}
