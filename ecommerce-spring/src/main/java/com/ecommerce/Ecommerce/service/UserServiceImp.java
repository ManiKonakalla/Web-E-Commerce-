package com.ecommerce.Ecommerce.service;

import com.ecommerce.Ecommerce.entity.User;
import com.ecommerce.Ecommerce.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Override
    @Transactional
    public List<User> findAllUsers() {
        return userRepo.findAll();
    }

    @Override
    @Transactional
    public Optional<User> findUserById(int theId) {
        return userRepo.findById(theId);
    }

    @Override
    @Transactional
    public User saveUser(User theUser) {
        return userRepo.save(theUser);
    }

    @Override
    @Transactional
    public void deleteUserById(int theId) {
        userRepo.deleteById(theId);
    }

    @Override
    @Transactional
    public List<User> credentialCheck( String username, String password) {

        List<User> theuser ;
        theuser = userRepo.credentialCheck(username, password);
        return theuser;
    }

    @Override
    @Transactional
    public void updateProfile(int userId, String username, String password, String firstName, String lastName, String phonenumber) {
        userRepo.updateProfile(userId, username, password, firstName, lastName, phonenumber);
    }

    @Override
    @Transactional
    public List<Integer> usernameCheck(String username) {
        return userRepo.usernameCheck(username);
    }

    @Override
    @Transactional
    public List<String> passwordCheck( String password, int userId ) {
        return userRepo.passwordCheck(password, userId) ;
    }

    @Override
    @Transactional
    public List<String> usernameGoogleCheck(String username) {
        return userRepo.usernameGoogleCheck(username);
    }

}
