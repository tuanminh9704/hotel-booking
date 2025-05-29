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

    public static RoomTypeDTO mapRoomEntityToRoomTypeDTO(RoomType room) {
        RoomTypeDTO roomTypeDTO = new RoomTypeDTO();

        roomTypeDTO.setId(room.getId());
        roomTypeDTO.setPrice(room.getPrice());
        roomTypeDTO.setRoomArea(room.getRoomArea());
        roomTypeDTO.setQuantityBed(room.getQuantityBed());
        roomTypeDTO.setQuantityPeople(room.getQuantityPeople());
        return roomTypeDTO;
    }

    public static BookingDTO mapBookingEntityToBookingDTO(Booking booking) {
        BookingDTO bookingDTO = new BookingDTO();
        // Map simple fields
        bookingDTO.setId(booking.getId());
        bookingDTO.setCheckInDate(booking.getCheckInDate());
        bookingDTO.setCheckOutDate(booking.getCheckOutDate());
        bookingDTO.setBookingConfirmationCode(booking.getBookingConfirmationCode());
        return bookingDTO;
    }

    public static RoomTypeDTO mapRoomEntityToRoomDTOPlusBookings(RoomType room) {
        RoomTypeDTO roomDTO = new RoomTypeDTO();

        roomDTO.setId(room.getId());
        roomDTO.setName(room.getName());
        roomDTO.setQuantityBed(room.getQuantityBed());
        roomDTO.setQuantityPeople(room.getQuantityPeople());
        roomDTO.setRoomArea(room.getRoomArea());

        if (room.getBookings() != null) {
            roomDTO.setBookings(
                    room.getBookings().stream().map(Utils::mapBookingEntityToBookingDTO).collect(Collectors.toList()));
        }
        return roomDTO;
    }

    public static BookingDTO mapBookingEntityToBookingDTOPlusBookedRooms(Booking booking, boolean mapUser) {

        BookingDTO bookingDTO = new BookingDTO();
        // Map simple fields
        bookingDTO.setId(booking.getId());
        bookingDTO.setCheckInDate(booking.getCheckInDate());
        bookingDTO.setCheckOutDate(booking.getCheckOutDate());
        bookingDTO.setBookingConfirmationCode(booking.getBookingConfirmationCode());
        if (mapUser) {
            bookingDTO.setUser(Utils.mapUserEntityToUserDTO(booking.getUser()));
        }
        if (booking.getRoomType() != null) {
            RoomTypeDTO roomTypeDTO = new RoomTypeDTO();

            roomTypeDTO.setId(booking.getRoomType().getId());
            roomTypeDTO.setName(booking.getRoomType().getName());
            roomTypeDTO.setQuantityBed(booking.getRoomType().getQuantityBed());
            roomTypeDTO.setQuantityPeople(booking.getRoomType().getQuantityPeople());
            roomTypeDTO.setRoomArea(booking.getRoomType().getRoomArea());

            bookingDTO.setRoomType(roomTypeDTO);
        }
        return bookingDTO;
    }

    public static UserDTO mapUserEntityToUserDTOPlusUserBookingsAndRoom(User user) {
        UserDTO userDTO = new UserDTO();

        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setRole(user.getRole());

        if (!user.getBookings().isEmpty()) {
            userDTO.setBookings(user.getBookings().stream()
                    .map(booking -> mapBookingEntityToBookingDTOPlusBookedRooms(booking, false))
                    .collect(Collectors.toList()));
        }
        return userDTO;
    }

    public static List<UserDTO> mapUserListEntityToUserListDTO(List<User> userList) {
        return userList.stream().map(Utils::mapUserEntityToUserDTO).collect(Collectors.toList());
    }

    public static List<RoomTypeDTO> mapRoomListEntityToRoomListDTO(List<RoomType> roomList) {
        return roomList.stream().map(Utils::mapRoomEntityToRoomTypeDTO).collect(Collectors.toList());
    }

    public static List<BookingDTO> mapBookingListEntityToBookingListDTO(List<Booking> bookingList) {
        return bookingList.stream().map(Utils::mapBookingEntityToBookingDTO).collect(Collectors.toList());
    }

}
