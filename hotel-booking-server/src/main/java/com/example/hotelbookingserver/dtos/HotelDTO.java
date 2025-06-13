package com.example.hotelbookingserver.dtos;

import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
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

}
