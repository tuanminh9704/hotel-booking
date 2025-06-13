package com.example.hotelbookingserver.services;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.hotelbookingserver.dtos.*;
import com.example.hotelbookingserver.entities.*;
import com.example.hotelbookingserver.exception.OurException;
import com.example.hotelbookingserver.repositories.*;
import com.example.hotelbookingserver.utils.Utils;

@Service
public class RoomTypeService implements IRoomTypeService {

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private AmenityRepository amenityRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ImageService imageService;

    @Override
    public Response addNewRoom(UUID hotelId, RoomTypeDTO roomTypeDTO) {
        Response response = new Response();
        try {
            Hotel hotel = hotelRepository.findById(hotelId).orElse(null);
            if (hotel == null) {
                response.setStatusCode(404);
                response.setMessage("Không tìm thấy khách sạn.");
                return response;
            }

            RoomType roomType = new RoomType();
            roomType.setName(roomTypeDTO.getName());
            roomType.setQuantityBed(roomTypeDTO.getQuantityBed());
            roomType.setQuantityPeople(roomTypeDTO.getQuantityPeople());
            roomType.setRoomArea(roomTypeDTO.getRoomArea());
            roomType.setQuantityRoom(roomTypeDTO.getQuantityRoom());
            roomType.setPrice(roomTypeDTO.getPrice());
            roomType.setHotel(hotel);

            RoomType savedRoom = roomTypeRepository.save(roomType);

            // Thêm tiện nghi
            if (roomTypeDTO.getAmenities() != null) {
                for (AmenityDTO amenityDTO : roomTypeDTO.getAmenities()) {
                    Amenity amenity = new Amenity();
                    amenity.setName(amenityDTO.getName());
                    amenity.setRoomType(savedRoom);
                    amenityRepository.save(amenity);
                }
            }

            // Thêm ảnh
            if (roomTypeDTO.getImages() != null) {
                for (ImageDTO imageDTO : roomTypeDTO.getImages()) {
                    MultipartFile file = imageDTO.getFile();
                    if (file != null && !file.isEmpty()) {
                        Map uploadResult = imageService.uploadImage(file);
                        String imageUrl = uploadResult.get("secure_url").toString();

                        Image image = new Image();
                        image.setImageUrl(imageUrl);
                        image.setRoomType(savedRoom);
                        imageRepository.save(image);
                    }
                }
            }

            response.setStatusCode(201);
            response.setMessage("Thêm loại phòng thành công.");
            response.setRoomList(List.of(Utils.mapRoomEntityToRoomDTO(savedRoom)));

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Lỗi khi thêm loại phòng: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response updateRoom(UUID roomId, RoomTypeDTO roomTypeDTO) {
        Response response = new Response();
        try {
            RoomType room = roomTypeRepository.findById(roomId).orElse(null);
            if (room == null) {
                response.setStatusCode(404);
                response.setMessage("Không tìm thấy loại phòng.");
                return response;
            }

            room.setName(roomTypeDTO.getName());
            room.setQuantityBed(roomTypeDTO.getQuantityBed());
            room.setQuantityPeople(roomTypeDTO.getQuantityPeople());
            room.setRoomArea(roomTypeDTO.getRoomArea());
            room.setQuantityRoom(roomTypeDTO.getQuantityRoom());
            room.setPrice(roomTypeDTO.getPrice());

            RoomType updatedRoom = roomTypeRepository.save(room);

            // Xóa & thêm lại tiện nghi
            amenityRepository.deleteByRoomTypeId(roomId);
            if (roomTypeDTO.getAmenities() != null) {
                for (AmenityDTO amenityDTO : roomTypeDTO.getAmenities()) {
                    Amenity amenity = new Amenity();
                    amenity.setName(amenityDTO.getName());
                    amenity.setRoomType(updatedRoom);
                    amenityRepository.save(amenity);
                }
            }

            // Xóa & thêm lại ảnh
            imageRepository.deleteByRoomTypeId(roomId);
            if (roomTypeDTO.getImages() != null) {
                for (ImageDTO imageDTO : roomTypeDTO.getImages()) {
                    MultipartFile file = imageDTO.getFile();
                    if (file != null && !file.isEmpty()) {
                        Map uploadResult = imageService.uploadImage(file);
                        String imageUrl = uploadResult.get("secure_url").toString();

                        Image image = new Image();
                        image.setImageUrl(imageUrl);
                        image.setRoomType(updatedRoom);
                        imageRepository.save(image);
                    }
                }
            }

            response.setStatusCode(200);
            response.setMessage("Cập nhật loại phòng thành công.");
            response.setRoomList(List.of(Utils.mapRoomEntityToRoomDTO(updatedRoom)));

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Lỗi khi cập nhật loại phòng: " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteRoom(UUID roomId) {
        Response response = new Response();
        try {
            RoomType room = roomTypeRepository.findById(roomId).orElseThrow(() -> new OurException("Room Not Found"));
            roomTypeRepository.delete(room);
            response.setStatusCode(200);
            response.setMessage("Xoá loại phòng thành công.");
        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Lỗi khi xoá loại phòng: " + e.getMessage());
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
            response.setMessage("Lấy danh sách loại phòng thành công.");
            response.setRoomList(roomDTOList);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Lỗi: " + e.getMessage());
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
            response.setMessage("Lấy thông tin loại phòng thành công.");
            response.setRoom(roomDTO);
        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Lỗi: " + e.getMessage());
        }
        return response;
    }

    @Override
    public List<String> getAllRoomTypeNames() {
        return roomTypeRepository.findDistinctRoomTypeNames();
    }

    @Override
    public Response getAvailableRoomsByDataAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType) {
        Response response = new Response();
        try {
            List<RoomType> availableRooms = roomTypeRepository.findAvailableRoomsByDatesAndTypes(checkInDate,
                    checkOutDate, roomType);
            List<RoomTypeDTO> roomDTOList = Utils.mapRoomListEntityToRoomListDTO(availableRooms);
            response.setStatusCode(200);
            response.setMessage("Thành công.");
            response.setRoomList(roomDTOList);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Lỗi: " + e.getMessage());
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
            response.setMessage("Thành công.");
            response.setRoomList(roomDTOList);
        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Lỗi: " + e.getMessage());
        }
        return response;
    }
}
