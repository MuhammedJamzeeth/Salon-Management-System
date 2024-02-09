package com.jamsy.shop.controller;
import com.jamsy.shop.auth.AuthenticationRequest;
import com.jamsy.shop.auth.AuthenticationService;
import com.jamsy.shop.auth.RegisterRequest;
import com.jamsy.shop.entity.User;
import com.jamsy.shop.repository.UserRepository;
import com.jamsy.shop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {

    private final UserService userService;
    @Autowired
    private UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final AuthenticationService authenticationService;


    public AuthController(UserService userService, AuthenticationManager authenticationManager, AuthenticationService authenticationService) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody AuthenticationRequest request){
        if(request.getEmail().isEmpty()){
            return new ResponseEntity<>("Email cannot be empty", HttpStatus.BAD_REQUEST);
        }
        if(request.getPassword().isEmpty()){
            return new ResponseEntity<>("Password cannot be empty", HttpStatus.BAD_REQUEST);
        }
        if(!(userRepository.existsByEmail(request.getEmail()))){
            return new ResponseEntity<>("Email not find register first", HttpStatus.BAD_REQUEST);
        }
        if(!(authenticationService.matchPassword(request.getEmail(), request.getPassword()))){
            return new ResponseEntity<>("Incorrect password", HttpStatus.UNAUTHORIZED);
        }

        return ResponseEntity.ok(authenticationService.authenticate(request));
    }
//    @PostMapping("/register")
//    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest){
//
//        if(registerRequest.getFirstName().isEmpty()){
//            return new ResponseEntity<>("First Name and Last Name cannot be empty", HttpStatus.BAD_REQUEST);
//        }
//        if(userRepository.existsByEmail(registerRequest.getEmail())){
//            return new ResponseEntity<>("Email Already Taken", HttpStatus.BAD_REQUEST);
//        }
//        if (registerRequest.getPassword().length() < 8) {
//            return ResponseEntity.badRequest().body("Password must be at least 8 characters long");
//        }
//        return ResponseEntity.ok(authenticationService.register(registerRequest));
//
//    }
    @PostMapping("/register_shop")
    public ResponseEntity<?> registerUser(@ModelAttribute RegisterRequest registerRequest){
        if(userRepository.existsByEmail(registerRequest.getEmail())){
            return new ResponseEntity<>("Email Already Taken", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(authenticationService.register(registerRequest));

    }


}
