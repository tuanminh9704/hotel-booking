package com.example.hotelbookingserver.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.hotelbookingserver.dtos.LoginRequest;
import com.example.hotelbookingserver.dtos.Response;
import com.example.hotelbookingserver.entities.User;
import com.example.hotelbookingserver.services.IUserService;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private IUserService userService;

    @PostMapping("/register")
    public ResponseEntity<Response> register(@RequestBody User user) {
        Response response = userService.register(user);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Response> login(@RequestBody LoginRequest loginRequest) {
        Response response = userService.login(loginRequest);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/users")
    public Response getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/user/{id}")
    public Response getUserById(@PathVariable String id) {
        return userService.getUserById(id);
    }

    @DeleteMapping("/user/{id}")
    public Response deleteUser(@PathVariable String id) {
        return userService.deleteUser(id);
    }

    @GetMapping("/my-info")
    public Response getMyInfo(@RequestParam String email) {
        return userService.getMyInfo(email);
    }

}
