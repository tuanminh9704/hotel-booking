package com.example.hotelbookingserver.services;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.hotelbookingserver.dtos.Response;
import com.example.hotelbookingserver.dtos.RoomTypeDTO;
import com.example.hotelbookingserver.entities.Hotel;
import com.example.hotelbookingserver.entities.RoomType;
import com.example.hotelbookingserver.repositories.BookingRepository;
import com.example.hotelbookingserver.repositories.HotelRepository;
import com.example.hotelbookingserver.repositories.RoomTypeRepository;
import com.example.hotelbookingserver.utils.Utils;

@Service
public class RoomTypeService implements IRoomTypeService {
    @Autowired
    private RoomTypeRepository roomTypeRepository;

    @Override
    public Response addNewRoom(String name, int quantityBed, int quantityPeople, int roomArea, BigDecimal price,
            int quantityRoom) {
        Response response = new Response();

        try {
            RoomType roomType = new RoomType();
            roomType.setName(name);
            roomType.setQuantityBed(quantityBed);
            roomType.setQuantityPeople(quantityPeople);
            roomType.setRoomArea(roomArea);
            roomType.setPrice(price);
            roomType.setQuantityRoom(quantityRoom);

            RoomType savedRoom = roomTypeRepository.save(roomType);
            RoomTypeDTO roomTypeDTO = Utils.mapRoomEntityToRoomDTO(savedRoom);
            response.setStatusCode(200);
            response.setMessage("successful");
            response.setRoom(roomTypeDTO);

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving a room " + e.getMessage());
        }
        return response;
    }

    @Override
    public List<String> getAlRoomTypeNames() {
        return roomTypeRepository.findDistinctRoomTypeNames();
    }

    @Override
    public Response getAllRoomTypes() {
        Response response = new Response();

        try {
            List<RoomType> roomList = roomTypeRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
            List<RoomTypeDTO> roomDTOList = Utils.mapRoomListEntityToRoomListDTO(roomList);
            response.setStatusCode(200);
            response.setMessage("successful");
            response.setRoomList(roomDTOList);

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving a room " + e.getMessage());
        }
        return response;
    }
}
