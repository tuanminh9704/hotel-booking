package com.example.hotelbookingserver.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.hotelbookingserver.services.CloudinaryService;

@RestController
@RequestMapping("/images")
@CrossOrigin
public class ImageUploadController {

    @Autowired
    private CloudinaryService cloudinaryService;

    // Upload 1 ảnh → trả về URL

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        String url = cloudinaryService.uploadToCloudinary(file);
        return ResponseEntity.ok(url);
    }

    // Upload nhiều ảnh → trả về danh sách URL

    @PostMapping("/upload-multiple")
    public ResponseEntity<List<String>> uploadImages(@RequestParam("files") List<MultipartFile> files) {
        List<String> urls = cloudinaryService.uploadMultipleFiles(files);
        return ResponseEntity.ok(urls);
    }
}
