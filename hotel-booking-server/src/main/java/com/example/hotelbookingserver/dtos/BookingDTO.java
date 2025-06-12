package com.example.hotelbookingserver.dtos;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BookingDTO {
    private UUID id;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private UUID hotelId;
    private UUID roomTypeId;
    private String status;
    private UserDTO user;
    private RoomTypeDTO room;

}
