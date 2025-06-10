package com.example.hotelbookingserver.services;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.hotelbookingserver.dtos.LoginRequest;
import com.example.hotelbookingserver.dtos.Response;
import com.example.hotelbookingserver.dtos.UserDTO;
import com.example.hotelbookingserver.entities.User;
import com.example.hotelbookingserver.exception.OurException;
import com.example.hotelbookingserver.repositories.UserRepository;
import com.example.hotelbookingserver.utils.JWTUtils;
import com.example.hotelbookingserver.utils.Utils;

@Service
public class UserService implements IUserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public Response register(User user) {
        Response response = new Response();
        try {
            if (user.getRole() == null || user.getRole().isBlank()) {
                user.setRole("USER");
            }
            if (userRepository.existsByEmail(user.getEmail())) {
                throw new OurException(user.getEmail() + "Already Exists");
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = userRepository.save(user);
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(savedUser);
            response.setStatusCode(200);
            response.setUser(userDTO);
        } catch (OurException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Occurred During USer Registration " + e.getMessage());

        }
        return response;
    }

    @Override
    public Response login(LoginRequest loginRequest) {

        Response response = new Response();

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            var user = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new OurException("user Not found"));

            var token = jwtUtils.generateToken(user);
            response.setStatusCode(200);
            response.setToken(token);
            response.setRole(user.getRole());
            response.setExpirationTime("7 Days");
            response.setMessage("successful");
            response.setFullName(user.getName());
            response.setEmail(user.getEmail());
            response.setPhone(user.getPhone());

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        } catch (Exception e) {

            response.setStatusCode(500);
            response.setMessage("Error Occurred During USer Login " + e.getMessage());
        }
        return response;
    }

    // @Override
    // public Response getAllUsers() {

    // Response response = new Response();
    // try {
    // List<User> userList = userRepository.findAll();
    // List<UserDTO> userDTOList = Utils.mapUserListEntityToUserListDTO(userList);
    // response.setStatusCode(200);
    // response.setMessage("successful");
    // response.setUserList(userDTOList);

    // } catch (Exception e) {
    // response.setStatusCode(500);
    // response.setMessage("Error getting all users " + e.getMessage());
    // }
    // return response;
    // }

    // @Override
    // public Response getUserBookingHistory(String userId) {

    // Response response = new Response();

    // try {
    // UUID uuid = UUID.fromString(userId);
    // User user = userRepository.findById(uuid)
    // .orElseThrow(() -> new OurException("User Not Found"));
    // UserDTO userDTO = Utils.mapUserEntityToUserDTOPlusUserBookingsAndRoom(user);
    // response.setStatusCode(200);
    // response.setMessage("successful");
    // response.setUser(userDTO);

    // } catch (OurException e) {
    // response.setStatusCode(404);
    // response.setMessage(e.getMessage());

    // } catch (Exception e) {

    // response.setStatusCode(500);
    // response.setMessage("Error getting all users " + e.getMessage());
    // }
    // return response;
    // }

    // @Override
    // public Response deleteUser(String userId) {

    // Response response = new Response();

    // try {
    // UUID uuid = UUID.fromString(userId);
    // userRepository.findById(uuid).orElseThrow(() -> new OurException("User Not
    // Found"));
    // userRepository.deleteById(uuid);
    // response.setStatusCode(200);
    // response.setMessage("successful");

    // } catch (OurException e) {
    // response.setStatusCode(404);
    // response.setMessage(e.getMessage());

    // } catch (Exception e) {

    // response.setStatusCode(500);
    // response.setMessage("Error getting all users " + e.getMessage());
    // }
    // return response;
    // }

    // @Override
    // public Response getUserById(String userId) {

    // Response response = new Response();

    // try {
    // UUID uuid = UUID.fromString(userId);
    // User user = userRepository.findById(uuid)
    // .orElseThrow(() -> new OurException("User Not Found"));
    // UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);
    // response.setStatusCode(200);
    // response.setMessage("successful");
    // response.setUser(userDTO);

    // } catch (OurException e) {
    // response.setStatusCode(404);
    // response.setMessage(e.getMessage());

    // } catch (Exception e) {

    // response.setStatusCode(500);
    // response.setMessage("Error getting all users " + e.getMessage());
    // }
    // return response;
    // }

    // @Override
    // public Response getMyInfo(String email) {

    // Response response = new Response();

    // try {
    // User user = userRepository.findByEmail(email).orElseThrow(() -> new
    // OurException("User Not Found"));
    // UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);
    // response.setStatusCode(200);
    // response.setMessage("successful");
    // response.setUser(userDTO);

    // } catch (OurException e) {
    // response.setStatusCode(404);
    // response.setMessage(e.getMessage());

    // } catch (Exception e) {

    // response.setStatusCode(500);
    // response.setMessage("Error getting all users " + e.getMessage());
    // }
    // return response;
    // }
}
