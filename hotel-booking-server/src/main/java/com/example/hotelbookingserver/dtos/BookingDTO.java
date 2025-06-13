package com.example.hotelbookingserver.dtos;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;
<<<<<<< HEAD

@Data
=======
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
>>>>>>> c1bfe548660e083e4336c466538b96c3f4c16665
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BookingDTO {
    private UUID id;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private UUID hotelId;
    private UUID userId;
    private UUID roomTypeId;
    private String status;
<<<<<<< HEAD
    private UserDTO user;
    private RoomTypeDTO room;

=======

    private HotelDTO hotel;
    private UserDTO user;
    private RoomTypeDTO room;
>>>>>>> c1bfe548660e083e4336c466538b96c3f4c16665
}
