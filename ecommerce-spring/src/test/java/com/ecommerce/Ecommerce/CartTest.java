package com.ecommerce.Ecommerce;

import com.ecommerce.Ecommerce.entity.Cart;
import com.ecommerce.Ecommerce.service.CartService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase( replace= AutoConfigureTestDatabase.Replace.NONE )
@Rollback(false)
public class CartTest {

    @Autowired
    private CartService cartService ;

    @Test
    public void getCartItemsByUserID() {
        int userId = 3;
        List<Cart> cartitems = cartService.cartByUserid(userId);

        Assertions.assertTrue(cartitems.size()==5);
    }

    @Test
    public void deleteCartByUserId() {
        int userId = 1;
        cartService.deleteCartByUserid(userId);
    }
}
