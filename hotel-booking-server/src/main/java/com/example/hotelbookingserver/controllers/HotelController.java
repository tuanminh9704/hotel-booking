package com.example.hotelbookingserver.controllers;

import com.example.hotelbookingserver.services.HotelService;
import com.example.hotelbookingserver.dtos.HotelDTO;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/hotels")
@CrossOrigin
public class HotelController {
    private final HotelService hotelService;

    @Autowired
    public HotelController(HotelService hotelService) {
        this.hotelService = hotelService;
    }

    @GetMapping()
    public List<HotelDTO> getAllHotels() {
        return hotelService.getAllHotels();
    }
    

}
