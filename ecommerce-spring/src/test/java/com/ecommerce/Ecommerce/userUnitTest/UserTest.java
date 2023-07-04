package com.ecommerce.Ecommerce.userUnitTest;

import com.ecommerce.Ecommerce.entity.User;
import com.ecommerce.Ecommerce.repository.UserRepo;
import com.ecommerce.Ecommerce.service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase( replace= AutoConfigureTestDatabase.Replace.NONE )
@Rollback(false)
public class UserTest {

    @Autowired
    private UserService userService;

    @Autowired
    private TestEntityManager testEntityManager;

    @Test
    public void createUser() throws SQLException {
        User testuser = new User() ;

        testuser.setUsername("janu");
        testuser.setPassword("doney1234");
        testuser.setGender("prefer not to say");
        testuser.setFirstName("Doney");
        testuser.setLastName("PPP");
        testuser.setRole("customer");
        testuser.setPhonenumber("9278345100");

        User saveuser = userService.saveUser(testuser);

        Assertions.assertTrue(saveuser.getUserId()>0);
    }

    @Test
    public void getAllUsers() {
        List<User> users = userService.findAllUsers();
        Assertions.assertTrue(users.size()==13);
    }

    @Test
    public void getUserById() {
        Optional<User> saveuser = userService.findUserById(3);
        System.out.println(saveuser.get());
    }

    @Test
    public void checkUser() {
        String username="arjun@gmail.com";
        String password="arjun123";
        List<User> users = userService.credentialCheck(username, password);
        if(users.size() == 0 ) {
            System.out.println("no user");
        }
        else {
            System.out.println(users);
        }
    }

    @Test
    public void deleteUser() {
        userService.deleteUserById(56);
    }

}
