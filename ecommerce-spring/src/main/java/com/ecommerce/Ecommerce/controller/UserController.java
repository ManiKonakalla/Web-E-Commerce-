package com.ecommerce.Ecommerce.controller;

import com.ecommerce.Ecommerce.entity.User;
import com.ecommerce.Ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/ecommerce")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/users/{userId}")
    public Optional<User> getUserById(@PathVariable int userId ) {
        return userService.findUserById(userId);
    }

    @PostMapping("/users")
    public User saveUser(@RequestBody User theUser) {
        return userService.saveUser(theUser);
    }

    @PutMapping("/users")
    public User updateUser(@RequestBody User theUser) {
        return userService.saveUser(theUser) ;
    }

    @DeleteMapping("/users/{userId}")
    public void deleteUser(@PathVariable int userId) {
        userService.deleteUserById(userId);
    }

    @PostMapping("/login")
    public String UserCheck(@RequestBody User user) {

        List<User> theuser;
        theuser = userService.credentialCheck(user.getUsername(),user.getPassword());
        if( theuser.isEmpty() ) {
            return "wrong user";
        }
        else {
            return theuser.get(0).getRole()+" "+theuser.get(0).getUserId();
        }
    }

    @PutMapping("/updateUser")
    public void updateUser( @RequestParam("userId") int userId, @RequestParam("username") String username, @RequestParam("password") String password, @RequestParam("firstName") String firstName, @RequestParam("lastName") String lastName, @RequestParam("phonenumber") String phonenumber) {
        userService.updateProfile(userId, username, password, firstName, lastName, phonenumber);
    }

    @PutMapping("/usernameCheck")
    public Integer usernameCheck(@RequestParam("username") String username ) {

        List<Integer> id = userService.usernameCheck(username);
        if (id.isEmpty()) {
            return -1;
        }
        else {
            return id.get(0);
        }
    }

    @PutMapping("/passwordCheck")
    public String passwordCheck( @RequestParam("userId") int userId, @RequestParam("password") String password ) {
        List<String> role = userService.passwordCheck(password, userId) ;
        if(role.isEmpty()) {
            return "wrong password";
        }
        else {
            return role.get(0);
        }
    }

    @PutMapping("/usernameGoogleCheck")
    public String usernameGoogleCheck(@RequestParam("username") String username ) {

        List<String> role = userService.usernameGoogleCheck(username);
        if (role.isEmpty()) {
            return "no user";
        }
        else {
            return role.get(0);
        }
    }


}
