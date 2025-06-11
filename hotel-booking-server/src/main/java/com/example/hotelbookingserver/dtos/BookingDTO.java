package com.example.hotelbookingserver.dtos;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public class BookingDTO {
    private UUID id;
    private List<LocalDate> date;
    private UUID hotelId;
    private UUID roomTypeId;
    private String fullName;
    private String email;
    private String phone;
    private String status;

    public BookingDTO() {
    }

    public BookingDTO(UUID id, List<LocalDate> date,
            UUID hotelId, UUID roomTypeId, String status,
            String fullName, String email, String phone) {
        this.id = id;
        this.date = date;
        this.hotelId = hotelId;
        this.roomTypeId = roomTypeId;
        this.status = status;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public List<LocalDate> getDate() {
        return date;
    }

    public void setDate(List<LocalDate> date) {
        this.date = date;
    }

    public UUID getHotelId() {
        return hotelId;
    }

    public void setHotelId(UUID hotelId) {
        this.hotelId = hotelId;
    }

    public UUID getRoomTypeId() {
        return roomTypeId;
    }

    public void setRoomTypeId(UUID roomTypeId) {
        this.roomTypeId = roomTypeId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
