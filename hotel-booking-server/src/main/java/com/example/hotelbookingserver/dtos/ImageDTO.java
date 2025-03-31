package com.example.hotelbookingserver.dtos;

import java.util.UUID;

public class ImageDTO {
    private UUID id;
    private String imageUrl;

    public ImageDTO(UUID id, String imageUrl) {
        this.id = id;
        this.imageUrl = imageUrl;
    }

    public UUID getId() {
        return this.id;
    }

    public String getImageUrl() {
        return this.imageUrl;
    }
}
