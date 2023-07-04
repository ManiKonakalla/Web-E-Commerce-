package com.ecommerce.Ecommerce;

import com.ecommerce.Ecommerce.entity.User;
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

        testuser.setUsername("janvi");
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
        Assertions.assertTrue(users.size()>0);
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
        userService.deleteUserById(81);
    }

    @Test
    public void updateUser() {

        int userId = 1;
        String username = "teju@gmail.com";
        String password = "teju1234";
        String firstName = "Teju";
        String lastName = null;
        String phonenumber = "9087654321";

        userService.updateProfile(userId, username, password, firstName, lastName, phonenumber);

        Optional<User> theuser = userService.findUserById(userId) ;

        Assertions.assertEquals(username, theuser.get().getUsername() );
        Assertions.assertEquals(password, theuser.get().getPassword());
        Assertions.assertEquals(firstName, theuser.get().getFirstName());
        Assertions.assertEquals(lastName, theuser.get().getLastName());
        Assertions.assertEquals(phonenumber, theuser.get().getPhonenumber());

    }

    @Test
    public void usernameCheck() {

        String username = "mar@gmail.com";
        List<Integer> id = userService.usernameCheck(username);

        if( id.isEmpty() ) {
            System.out.println("no user");
        }
        else {
            Assertions.assertEquals(id.get(0), 51);
        }

    }

    @Test
    public void passwordCheck() {
        String password = "admin13";
        int userId = 50;
        List<String> role = userService.passwordCheck(password, userId) ;
        if(role.isEmpty()) {
            System.out.println("wrong password");
        }
        else {
            Assertions.assertEquals(role.get(0), "admin");
        }
    }

    @Test
    public void usernameGoogleCheck() {

        String username = "admin@gmail.com";
        List<String> role = userService.usernameGoogleCheck(username);

        if( role.isEmpty() ) {
            System.out.println("no user");
        }
        else {
            Assertions.assertEquals(role.get(0), "50,admin");
        }

    }

}
