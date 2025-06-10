package com.example.hotelbookingserver.services;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.hotelbookingserver.dtos.BookingDTO;
import com.example.hotelbookingserver.entities.Booking;
import com.example.hotelbookingserver.repositories.BookingRepository;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public List<BookingDTO> getAllBookingDTOs() {
        return bookingRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public BookingDTO getBookingDTOById(UUID id) {
        return bookingRepository.findById(id)
                .map(this::toDTO)
                .orElse(null);
    }

    private BookingDTO toDTO(Booking booking) {
        return new BookingDTO(
                booking.getId(),
                booking.getCheckInDate(),
                booking.getCheckOutDate(),
                booking.getBookingConfirmationCode(),
                booking.getUser() != null ? booking.getUser().getId() : null,
                booking.getHotel() != null ? booking.getHotel().getId() : null,
                booking.getRoomType() != null ? booking.getRoomType().getId() : null,
                booking.getStatus(),
                booking.getUser() != null ? booking.getUser().getName() : null,
                booking.getHotel() != null ? booking.getHotel().getName() : null,
                booking.getRoomType() != null ? booking.getRoomType().getName() : null,
                booking.getCreatedAt() != null ? booking.getCreatedAt().format(formatter) : null,
                booking.getUpdatedAt() != null ? booking.getUpdatedAt().format(formatter) : null);
    }

}