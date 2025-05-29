package com.example.hotelbookingserver.services;

import com.example.hotelbookingserver.entities.Hotel;
import com.example.hotelbookingserver.repositories.HotelRepository;
import com.example.hotelbookingserver.dtos.HotelDTO;
import com.example.hotelbookingserver.dtos.ImageDTO;
import com.example.hotelbookingserver.dtos.ReviewsDTO;
import com.example.hotelbookingserver.dtos.RoomTypeDTO;
import com.example.hotelbookingserver.dtos.AmenityDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class HotelService {
    private final HotelRepository hotelRepository;

    @Autowired
    public HotelService(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    public List<HotelDTO> getAllHotels() {
        return hotelRepository.getListHotels().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private HotelDTO convertToDTO(Hotel hotel) {
        List<ImageDTO> images = hotel.getImages().stream()
                .map(image -> new ImageDTO(image.getId(), image.getImageUrl()))
                .collect(Collectors.toList());

        List<ReviewsDTO> reviews = hotel.getReviews().stream()
                .map(review -> new ReviewsDTO(review.getId(), review.getRating(), review.getContent()))
                .collect(Collectors.toList());

        List<RoomTypeDTO> roomTypes = hotel.getRoomTypes().stream()
                .map(roomType -> {
                    List<AmenityDTO> amenities = roomType.getAmenities().stream()
                            .map(amenity -> new AmenityDTO(amenity.getId(), amenity.getName(), roomType.getId()))
                            .collect(Collectors.toList());

                    RoomTypeDTO roomTypeDTO = new RoomTypeDTO(
                            roomType.getId(),
                            roomType.getName(),
                            roomType.getQuantityBed(),
                            roomType.getQuantityPeople(),
                            roomType.getRoomArea(),
                            roomType.getPrice(),
                            amenities);

                    return roomTypeDTO;
                })
                .collect(Collectors.toList());

        return new HotelDTO(
                hotel.getId(),
                hotel.getName(),
                hotel.getThumbnail(),
                hotel.getAddress(),
                hotel.getLinkMap(),
                hotel.getDescription(),
                hotel.getRate(),
                hotel.getCheckInTime(),
                hotel.getCheckOutTime(),
                images,
                roomTypes,
                reviews);
    }
}
