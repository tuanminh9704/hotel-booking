package com.example.hotelbookingserver.controllers;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.hotelbookingserver.dtos.Response;
import com.example.hotelbookingserver.services.IBookingService;
import com.example.hotelbookingserver.services.IRoomTypeService;

@RestController
@RequestMapping("/rooms")
@CrossOrigin
public class RoomController {
    @Autowired
    private IRoomTypeService roomService;

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> addNewRoom(
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "quantityBed", required = false) int quantityBed,
            @RequestParam(value = "quantityPeople", required = false) int quantityPeople,
            @RequestParam(value = "roomArea", required = false) int roomArea,
            @RequestParam(value = "price", required = false) BigDecimal price,
            @RequestParam(value = "quantityRoom", required = false) int quantityRoom) {

        if (name == null || name.isEmpty() || price == null) {
            Response response = new Response();
            response.setStatusCode(400);
            response.setMessage("Please provide values for all fields(photo, roomType,roomPrice)");
            return ResponseEntity.status(response.getStatusCode()).body(response);
        }
        Response response = roomService.addNewRoom(name, quantityBed, quantityPeople, roomArea, price, quantityRoom);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/all")
    public ResponseEntity<Response> getAllRooms() {
        Response response = roomService.getAllRoomTypes();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
