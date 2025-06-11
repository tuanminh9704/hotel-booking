package com.example.hotelbookingserver.services;

import java.math.BigDecimal;
import java.util.List;

import com.example.hotelbookingserver.dtos.Response;

public interface IRoomTypeService {
    Response addNewRoom(String name, int quantityBed, int quantityPeople, int roomArea, BigDecimal price,
            int quantityRoom);

    List<String> getAlRoomTypeNames();

    Response getAllRoomTypes();

    // Response deleteRoom(Long roomId);

    // Response updateRoom(Long roomId, String description, String roomType,
    // BigDecimal roomPrice, MultipartFile photo);

    // Response getRoomById(Long roomId);

    // Response getAvailableRoomsByDataAndType(LocalDate checkInDate, LocalDate
    // checkOutDate, String roomType);

    // Response getAllAvailableRooms();
}
