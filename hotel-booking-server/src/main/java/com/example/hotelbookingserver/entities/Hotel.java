package com.example.hotelbookingserver.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.UuidGenerator;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "hotels")
public class Hotel {
    @Id
    @GeneratedValue
    @UuidGenerator
    @Column(columnDefinition = "CHAR(36)", updatable = false, nullable = false)
    private UUID id;

    @Column(nullable = false)
    private String name;

    private String thumbnail;

    @Column(nullable = false)
    private String address;

    private String linkMap;

    private String description;

    @Column(nullable = false)
    private float rate;

    private String checkInTime;

    private String checkOutTime;

    @OneToMany(mappedBy = "hotel", fetch = FetchType.LAZY)
    @BatchSize(size = 10)
    private Set<Image> images = new HashSet<>();

    @OneToMany(mappedBy = "hotel", fetch = FetchType.LAZY)
    @BatchSize(size = 10)
    private Set<RoomType> roomTypes = new HashSet<>();

    @OneToMany(mappedBy = "hotel", fetch = FetchType.LAZY)
    @BatchSize(size = 10)
    private Set<Reviews> reviews = new HashSet<>();

    @OneToMany(mappedBy = "hotel", fetch = FetchType.LAZY)
    @BatchSize(size = 10)
    private Set<Booking> bookings = new HashSet<>();

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public String getLinkMap() {
        return linkMap;
    }

    public String getDescription() {
        return description;
    }

    public float getRate() {
        return rate;
    }

    public String getCheckInTime() {
        return checkInTime;
    }

    public String getCheckOutTime() {
        return checkOutTime;
    }

    public Set<Image> getImages() {
        return this.images;
    }

    public Set<RoomType> getRoomTypes() {
        return this.roomTypes;
    }

    public Set<Reviews> getReviews() {
        return this.reviews;
    }
}