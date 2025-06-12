package com.example.hotelbookingserver.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.hotelbookingserver.entities.Amenity;

public interface AmenityRepository extends JpaRepository<Amenity, UUID> {

}
