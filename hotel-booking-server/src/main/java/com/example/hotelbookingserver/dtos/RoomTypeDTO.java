package com.example.hotelbookingserver.dtos;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RoomTypeDTO {
    private UUID id;
    private UUID hotelId;
    private String name;
    private int quantityBed;
    private int quantityPeople;
    private int roomArea;
    private int quantityRoom;
    private BigDecimal price;
    private List<AmenityDTO> amenities;
    private List<BookingDTO> bookings;

    public RoomTypeDTO(UUID id, String name, int quantityBed, int quantityPeople, int roomArea, int quantityRoom,
            BigDecimal price, List<AmenityDTO> amenities) {
        this.id = id;
        this.name = name;
        this.quantityBed = quantityBed;
        this.quantityPeople = quantityPeople;
        this.roomArea = roomArea;
        this.quantityRoom = quantityRoom;
        this.price = price;
        this.amenities = amenities;
    }

}
