package com.example.hotelbookingserver.dtos;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public class RoomTypeDTO {
    private UUID id;
    private String name;
    private int quantityBed;
    private int quantityPeople;
    private int roomArea;
    private BigDecimal price;
    List<AmenityDTO> amenities;

    public RoomTypeDTO(UUID id, String name, int quantityBed, int quantityPeople, int roomArea, BigDecimal price, List<AmenityDTO> amenities) {
        this.id = id;
        this.name = name;
        this.quantityBed = quantityBed;
        this.quantityPeople = quantityPeople;
        this.roomArea = roomArea;
        this.price = price;
        this.amenities = amenities;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQuantityBed() {
        return quantityBed;
    }

    public void setQuantityBed(int quantityBed) {
        this.quantityBed = quantityBed;
    }

    public int getQuantityPeople() {
        return quantityPeople;
    }

    public void setQuantityPeople(int quantityPeople) {
        this.quantityPeople = quantityPeople;
    }

    public int getRoomArea() {
        return roomArea;
    }

    public void setRoomArea(int roomArea) {
        this.roomArea = roomArea;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public List<AmenityDTO> getAmenities() {
        return amenities;
    }
}
