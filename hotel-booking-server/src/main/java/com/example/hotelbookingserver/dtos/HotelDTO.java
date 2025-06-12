package com.example.hotelbookingserver.dtos;

import java.util.UUID;
import java.util.List;

public class HotelDTO {
    private UUID id;
    private String name;
    private String thumbnail;
    private String address;
    private String linkMap;
    private String description;
    private float rate;
    private String checkInTime;
    private String checkOutTime;
    private List<ImageDTO> images;
    private List<RoomTypeDTO> roomTypes;
    private List<ReviewsDTO> reviews;

    public HotelDTO() {
    }

    public HotelDTO(UUID id, String name, String thumbnail, String address, String linkMap, String description,
            float rate, String checkInTime, String checkOutTime, List<ImageDTO> images, List<RoomTypeDTO> roomTypes,
            List<ReviewsDTO> reviews) {
        this.id = id;
        this.name = name;
        this.thumbnail = thumbnail;
        this.address = address;
        this.linkMap = linkMap;
        this.description = description;
        this.rate = rate;
        this.checkInTime = checkInTime;
        this.checkOutTime = checkOutTime;
        this.images = images;
        this.roomTypes = roomTypes;
        this.reviews = reviews;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public String getAddress() {
        return address;
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

    public List<ImageDTO> getImages() {
        return images;
    }

    public List<RoomTypeDTO> getRoomTypes() {
        return roomTypes;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setLinkMap(String linkMap) {
        this.linkMap = linkMap;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setRate(float rate) {
        this.rate = rate;
    }

    public void setCheckInTime(String checkInTime) {
        this.checkInTime = checkInTime;
    }

    public void setCheckOutTime(String checkOutTime) {
        this.checkOutTime = checkOutTime;
    }

    public void setImages(List<ImageDTO> images) {
        this.images = images;
    }

    public void setRoomTypes(List<RoomTypeDTO> roomTypes) {
        this.roomTypes = roomTypes;
    }

    public List<ReviewsDTO> getReviews() {
        return reviews;
    }

    public void setReviews(List<ReviewsDTO> reviews) {
        this.reviews = reviews;
    }

}
