package com.ecommerce.Ecommerce;

import com.ecommerce.Ecommerce.entity.Order;
import com.ecommerce.Ecommerce.entity.UserAddress;
import com.ecommerce.Ecommerce.service.OrderService;
import com.ecommerce.Ecommerce.service.UserAddressService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.List;
import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase( replace= AutoConfigureTestDatabase.Replace.NONE )
@Rollback(false)
public class UserAddressTest {

    @Autowired
    private UserAddressService userAddressService;

    @Autowired
    private OrderService orderService;

    @Test
    public void getUserAddressesByUserId() {
        int userId= 3 ;
        List<UserAddress> userAddresses = userAddressService.useraddressesByUserid(userId);

        Assertions.assertTrue(userAddresses.size() == 1);
    }

    @Test
    public void updateUserAddress() {

        int addId = 524;
        String name = "Mani";
        String hno = "675";
        String street = "South";
        String city = "vij";
        String state = "AP";
        String pincode = "534101";
        String phonenumber = "9087654312";
        String country = "India";

        userAddressService.updateUserAddress( addId, name, hno, street, city, state, pincode, phonenumber, country );

        Optional<UserAddress> theuserAddress = userAddressService.findUserAddressById(addId);

        Assertions.assertEquals( name, theuserAddress.get().getName() );
        Assertions.assertEquals( hno, theuserAddress.get().getHno() );
        Assertions.assertEquals( street, theuserAddress.get().getStreet() );
        Assertions.assertEquals( city, theuserAddress.get().getCity() );
        Assertions.assertEquals( state, theuserAddress.get().getState() );
        Assertions.assertEquals( pincode, theuserAddress.get().getPincode() );
        Assertions.assertEquals( phonenumber, theuserAddress.get().getPhonenumber() );

    }

    @Test
    public void userAddressOrderCheck() {
        int addId = 538;
        int len = orderService.userAddressOrderCheck(addId);
        Assertions.assertEquals(len, 3);
    }
}
