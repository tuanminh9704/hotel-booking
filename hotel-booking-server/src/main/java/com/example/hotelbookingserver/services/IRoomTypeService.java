package com.example.hotelbookingserver.services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import com.example.hotelbookingserver.dtos.Response;

public interface IRoomTypeService {
    Response addNewRoom(String name, int quantityBed, int quantityPeople, int roomArea, BigDecimal price,
            int quantityRoom);

    List<String> getAllRoomTypeNames();

    Response getAllRoomTypes();

    Response deleteRoom(UUID roomId);

    Response updateRoom(UUID roomId, String name, int quantityBed, int quantityPeople, int roomArea, BigDecimal price,
            int quantityRoom);

    Response getRoomById(UUID roomId);

    Response getAvailableRoomsByDataAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType);

    Response getAllAvailableRoomsByDate(LocalDate checkInDate, LocalDate checkOutDate);
}
