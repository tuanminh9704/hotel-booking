package com.example.hotelbookingserver.entities;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UuidGenerator;
import org.hibernate.type.SqlTypes;

@Entity
@Table(name = "room_types")
public class RoomType {

    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(columnDefinition = "CHAR(36)", updatable = false, nullable = false)
    @JdbcTypeCode(SqlTypes.CHAR)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(name = "quantity_bed", nullable = false)
    private int quantityBed;

    @Column(name = "quantity_people", nullable = false)
    private int quantityPeople;

    @Column(name = "room_area", nullable = false)
    private int roomArea;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(name = "quantity_room")
    private int quantityRoom;

    @OneToMany(mappedBy = "roomType", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @BatchSize(size = 10)
    private Set<Amenity> amenities = new HashSet<>();

    @OneToMany(mappedBy = "roomType", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Booking> bookings = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
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

    public Set<Amenity> getAmenities() {
        return amenities;
    }

    public void setAmenities(Set<Amenity> amenities) {
        this.amenities = amenities;
    }

    public List<Booking> getBookings() {
        return bookings;
    }

    public void setBookings(List<Booking> bookings) {
        this.bookings = bookings;
    }

    @Override
    public String toString() {
        return "RoomType [id=" + id + ", name=" + name + ", quantityBed=" + quantityBed + ", quantityPeople="
                + quantityPeople + ", roomArea=" + roomArea + ", price=" + price + ", quantityRoom=" + quantityRoom
                + ", amenities=" + amenities + ", bookings=" + bookings + ", hotel=" + hotel + "]";
    }

    public int getQuantityRoom() {
        return quantityRoom;
    }

    public void setQuantityRoom(int quantityRoom) {
        this.quantityRoom = quantityRoom;
    }

}
