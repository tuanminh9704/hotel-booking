package com.example.hotelbookingserver.services;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import com.example.hotelbookingserver.dtos.Response;
import com.example.hotelbookingserver.dtos.RoomTypeDTO;

public interface IRoomTypeService {
        Response addNewRoom(UUID hotelId, RoomTypeDTO roomTypeDTO);

        List<String> getAllRoomTypeNames();

        Response getAllRoomTypes();

        Response deleteRoom(UUID roomId);

        Response updateRoom(UUID hotelId, RoomTypeDTO roomTypeDTO);

        Response getRoomById(UUID roomId);

        Response getAvailableRoomsByDataAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType);

        Response getAllAvailableRoomsByDate(LocalDate checkInDate, LocalDate checkOutDate);
}
