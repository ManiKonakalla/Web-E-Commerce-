package com.ecommerce.Ecommerce.service;

import com.ecommerce.Ecommerce.entity.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


public interface UserService {

    public List<User> findAllUsers() ;

    public Optional<User> findUserById(int theId) ;

    public User saveUser(User theUser) ;

    public void deleteUserById(int theId) ;

    public List<User> credentialCheck( String username, String password);

    public void updateProfile( int userId, String username, String password, String firstName, String lastName, String phonenumber );

    public List<Integer> usernameCheck(String username ) ;

    public List<String> passwordCheck( String password, int userId ) ;

    public List<String> usernameGoogleCheck(String username ) ;

}
