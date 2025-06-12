package com.example.hotelbookingserver.services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.hotelbookingserver.dtos.Response;
import com.example.hotelbookingserver.dtos.RoomTypeDTO;
import com.example.hotelbookingserver.entities.Hotel;
import com.example.hotelbookingserver.entities.RoomType;
import com.example.hotelbookingserver.exception.OurException;
import com.example.hotelbookingserver.repositories.BookingRepository;
import com.example.hotelbookingserver.repositories.HotelRepository;
import com.example.hotelbookingserver.repositories.RoomTypeRepository;
import com.example.hotelbookingserver.utils.Utils;

@Service
public class RoomTypeService implements IRoomTypeService {
    @Autowired
    private RoomTypeRepository roomTypeRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Override
    public Response addNewRoom(UUID hotelId, String name, int quantityBed, int quantityPeople, int roomArea,
            BigDecimal price,
            int quantityRoom) {
        Response response = new Response();

        try {
            Optional<Hotel> optionalHotel = hotelRepository.findById(hotelId);
            if (!optionalHotel.isPresent()) {
                response.setStatusCode(404);
                response.setMessage("Hotel with ID " + hotelId + " not found.");
                return response;
            }

            Hotel hotel = optionalHotel.get();

            RoomType roomType = new RoomType();
            roomType.setName(name);
            roomType.setQuantityBed(quantityBed);
            roomType.setQuantityPeople(quantityPeople);
            roomType.setRoomArea(roomArea);
            roomType.setPrice(price);
            roomType.setQuantityRoom(quantityRoom);
            roomType.setHotel(hotel); // Gán Hotel vào RoomType

            RoomType savedRoom = roomTypeRepository.save(roomType);
            RoomTypeDTO roomTypeDTO = Utils.mapRoomEntityToRoomDTO(savedRoom);

            response.setStatusCode(200);
            response.setMessage("Room added successfully");
            response.setRoom(roomTypeDTO);

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving a room: " + e.getMessage());
        }

        return response;
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

    @Override
    public List<String> getAllRoomTypeNames() {
        return roomTypeRepository.findDistinctRoomTypeNames();
    }

    @Override
    public Response deleteRoom(UUID roomId) {
        Response response = new Response();

        try {
            roomTypeRepository.findById(roomId).orElseThrow(() -> new OurException("Room Not Found"));
            roomTypeRepository.deleteById(roomId);
            response.setStatusCode(200);
            response.setMessage("successful");

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving a room " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getRoomById(UUID roomId) {
        Response response = new Response();

        try {
            RoomType room = roomTypeRepository.findById(roomId).orElseThrow(() -> new OurException("Room Not Found"));
            RoomTypeDTO roomDTO = Utils.mapRoomEntityToRoomDTOPlusBookings(room);
            response.setStatusCode(200);
            response.setMessage("successful");
            response.setRoom(roomDTO);

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving a room " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAvailableRoomsByDataAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType) {
        Response response = new Response();

        try {
            List<RoomType> availableRooms = roomTypeRepository.findAvailableRoomsByDatesAndTypes(checkInDate,
                    checkOutDate, roomType);
            List<RoomTypeDTO> roomDTOList = Utils.mapRoomListEntityToRoomListDTO(availableRooms);
            response.setStatusCode(200);
            response.setMessage("successful");
            response.setRoomList(roomDTOList);

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving a room " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAllAvailableRoomsByDate(LocalDate checkInDate, LocalDate checkOutDate) {
        Response response = new Response();

        try {
            List<RoomType> roomList = roomTypeRepository.getAllAvailableRoomsByDate(checkInDate, checkOutDate);
            List<RoomTypeDTO> roomDTOList = Utils.mapRoomListEntityToRoomListDTO(roomList);
            response.setStatusCode(200);
            response.setMessage("successful");
            response.setRoomList(roomDTOList);

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving a room " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response updateRoom(UUID roomId, String name, int quantityBed, int quantityPeople, int roomArea,
            BigDecimal price, int quantityRoom) {
        Response response = new Response();

        try {
            RoomType room = roomTypeRepository.findById(roomId).orElseThrow(() -> new OurException("Room Not Found"));
            if (name != null)
                room.setName(name);
            room.setQuantityBed(quantityBed);
            room.setQuantityPeople(quantityPeople);
            room.setRoomArea(roomArea);
            room.setPrice(price);
            room.setQuantityRoom(quantityRoom);

            RoomType updatedRoom = roomTypeRepository.save(room);
            RoomTypeDTO roomDTO = Utils.mapRoomEntityToRoomDTO(updatedRoom);

            response.setStatusCode(200);
            response.setMessage("successful");
            response.setRoom(roomDTO);

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving a room " + e.getMessage());
        }
        return response;
    }
}
