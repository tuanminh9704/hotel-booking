package com.example.hotelbookingserver.utils;

import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.example.hotelbookingserver.dtos.AmenityDTO;
import com.example.hotelbookingserver.dtos.BookingDTO;
import com.example.hotelbookingserver.dtos.HotelDTO;
import com.example.hotelbookingserver.dtos.ImageDTO;
import com.example.hotelbookingserver.dtos.ReviewsDTO;
import com.example.hotelbookingserver.dtos.RoomTypeDTO;
import com.example.hotelbookingserver.dtos.UserDTO;
import com.example.hotelbookingserver.entities.Amenity;
import com.example.hotelbookingserver.entities.Booking;
import com.example.hotelbookingserver.entities.Hotel;
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
        userDTO.setId(user.getId() != null ? user.getId().toString() : null);
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhone());
        userDTO.setRole(user.getRole());
        return userDTO;
    }

    public static BookingDTO mapBookingEntityToBookingDTO(Booking booking) {
        BookingDTO bookingDTO = new BookingDTO();
        bookingDTO.setId(booking.getId());
        if (booking.getHotel() != null) {
            bookingDTO.setHotelId(booking.getHotel().getId());
        }

        if (booking.getRoomType() != null) {
            bookingDTO.setRoomTypeId(booking.getRoomType().getId());
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        List<LocalDate> dateList = Arrays.asList(
                booking.getCheckInDate(),
                booking.getCheckOutDate());
        bookingDTO.setDate(dateList);

        bookingDTO.setFullName(booking.getUser().getName());
        bookingDTO.setEmail(booking.getUser().getEmail());
        bookingDTO.setStatus(booking.getStatus());

        return bookingDTO;
    }

    public static RoomTypeDTO mapRoomEntityToRoomDTO(RoomType roomType) {
        RoomTypeDTO roomTypeDTO = new RoomTypeDTO();

        roomTypeDTO.setId(roomType.getId());
        roomTypeDTO.setName(roomType.getName());
        roomTypeDTO.setQuantityBed(roomType.getQuantityBed());
        roomTypeDTO.setQuantityPeople(roomType.getQuantityPeople());
        roomTypeDTO.setRoomArea(roomType.getRoomArea());
        roomTypeDTO.setPrice(roomType.getPrice());
        roomTypeDTO.setQuantityRoom(roomType.getQuantityRoom());

        return roomTypeDTO;
    }

    public static List<RoomTypeDTO> mapRoomListEntityToRoomListDTO(List<RoomType> roomList) {
        return roomList.stream().map(Utils::mapRoomEntityToRoomDTO).collect(Collectors.toList());
    }

    public static List<BookingDTO> mapBookingListEntityToBookingListDTO(List<Booking> bookingList) {
        return bookingList.stream().map(Utils::mapBookingEntityToBookingDTO).collect(Collectors.toList());
    }

    public static RoomTypeDTO mapRoomEntityToRoomDTOPlusBookings(RoomType room) {
        RoomTypeDTO roomDTO = new RoomTypeDTO();

        roomDTO.setId(room.getId());
        roomDTO.setName(room.getName());
        roomDTO.setQuantityBed(room.getQuantityBed());
        roomDTO.setQuantityPeople(room.getQuantityPeople());
        roomDTO.setRoomArea(room.getRoomArea());
        roomDTO.setQuantityRoom(room.getQuantityRoom());
        roomDTO.setPrice(room.getPrice());

        if (room.getBookings() != null) {
            roomDTO.setBookings(
                    room.getBookings().stream().map(Utils::mapBookingEntityToBookingDTO).collect(Collectors.toList()));
        }
        if (room.getAmenities() != null && !room.getAmenities().isEmpty()) {
            roomDTO.setAmenities(
                    room.getAmenities()
                            .stream()
                            .map(amenity -> {
                                AmenityDTO dto = new AmenityDTO();
                                dto.setId(amenity.getId());
                                dto.setName(amenity.getName());
                                return dto;
                            })
                            .collect(Collectors.toList()));
        }
        return roomDTO;
    }

    public static HotelDTO mapHotelEntityToHotelDTO(Hotel hotel) {
        HotelDTO hotelDTO = new HotelDTO();

        List<ImageDTO> images = hotel.getImages().stream()
                .map(image -> new ImageDTO(image.getId(), image.getImageUrl()))
                .collect(Collectors.toList());

        List<ReviewsDTO> reviews = hotel.getReviews().stream()
                .map(review -> new ReviewsDTO(review.getId(), review.getRating(), review.getContent()))
                .collect(Collectors.toList());

        List<RoomTypeDTO> roomTypes = hotel.getRoomTypes().stream()
                .map(roomType -> {
                    List<AmenityDTO> amenities = roomType.getAmenities().stream()
                            .map(amenity -> new AmenityDTO(
                                    amenity.getId(),
                                    amenity.getName(),
                                    roomType.getId()))
                            .collect(Collectors.toList());

                    return new RoomTypeDTO(
                            roomType.getId(),
                            roomType.getName(),
                            roomType.getQuantityBed(),
                            roomType.getQuantityPeople(),
                            roomType.getRoomArea(),
                            roomType.getQuantityRoom(),
                            roomType.getPrice(),
                            amenities);
                })
                .collect(Collectors.toList());

        hotelDTO.setId(hotel.getId());
        hotelDTO.setName(hotel.getName());
        hotelDTO.setThumbnail(hotel.getThumbnail());
        hotelDTO.setAddress(hotel.getAddress());
        hotelDTO.setLinkMap(hotel.getLinkMap());
        hotelDTO.setDescription(hotel.getDescription());
        hotelDTO.setRate(hotel.getRate());
        hotelDTO.setCheckInTime(hotel.getCheckInTime());
        hotelDTO.setCheckOutTime(hotel.getCheckOutTime());
        hotelDTO.setImages(images);
        hotelDTO.setRoomTypes(roomTypes);
        hotelDTO.setReviews(reviews);

        return hotelDTO;
    }

}
