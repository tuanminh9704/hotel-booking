package com.example.hotelbookingserver.services;

import com.example.hotelbookingserver.dtos.LoginRequest;
import com.example.hotelbookingserver.dtos.Response;
import com.example.hotelbookingserver.entities.User;

public interface IUserService {
    Response register(User user);

    Response login(LoginRequest loginRequest);

    Response getAllUsers();

    Response getUserBookingHistory(String userId);

    Response deleteUser(String userId);

    Response getUserById(String userId);

    Response getMyInfo(String email);

}