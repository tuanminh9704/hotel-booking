package com.example.hotelbookingserver.controllers;

import com.example.hotelbookingserver.dtos.HotelDTO;
import com.example.hotelbookingserver.dtos.Response;
import com.example.hotelbookingserver.services.HotelService;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/hotels")
@CrossOrigin
public class HotelController {

    private final HotelService hotelService;

    @Autowired
    public HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    @GetMapping("/all")
    public Response getAllHotels() {
        return hotelService.getAllHotels();
    }

    @GetMapping("/hotel-by-id/{id}")
    public Response getHotelById(@PathVariable UUID id) {
        return hotelService.getHotelById(id);
    }

    @PostMapping(value = "/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Response> addHotel(@ModelAttribute HotelDTO requestDTO) {
        Response response = hotelService.addHotel(requestDTO);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

}
