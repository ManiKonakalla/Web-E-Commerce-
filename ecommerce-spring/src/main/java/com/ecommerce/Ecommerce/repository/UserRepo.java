package com.ecommerce.Ecommerce.repository;

import com.ecommerce.Ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserRepo extends JpaRepository<User,Integer>{

    @Query("select u from User u where u.username=:theusername and u.password=:thepassword ")
    List<User> credentialCheck(@Param("theusername") String username, @Param("thepassword") String password);

    @Modifying
    @Query("update User u set " +
            "u.username=:username, " +
            "u.password=:password, " +
            "u.firstName=:firstName, " +
            "u.lastName=:lastName," +
            "u.phonenumber=:phonenumber where u.userId=:userId")
    public void updateProfile(@Param("userId") int userId,
                              @Param("username") String username,
                              @Param("password") String password,
                              @Param("firstName") String firstName,
                              @Param("lastName") String lastName,
                              @Param("phonenumber") String phonenumber
    );

    @Modifying
    @Query("select u.userId from User u where u.username=:username")
    public List<Integer> usernameCheck(@Param("username") String username ) ;

    @Modifying
    @Query("select u.userId,u.role from User u where u.username=:username")
    public List<String> usernameGoogleCheck(@Param("username") String username ) ;

    @Modifying
    @Query("select u.role from User u where u.userId=:userId and u.password=:password")
    public List<String> passwordCheck( @Param("password") String password, @Param("userId") int userId ) ;

}

