package com.ecommerce.Ecommerce;

import com.ecommerce.Ecommerce.entity.Order;
import com.ecommerce.Ecommerce.entity.OrdersLines;
import com.ecommerce.Ecommerce.entity.PlaceOrder;
import com.ecommerce.Ecommerce.entity.Product;
import com.ecommerce.Ecommerce.service.CartService;
import com.ecommerce.Ecommerce.service.OrderService;
import com.ecommerce.Ecommerce.service.OrdersLinesService;
import com.ecommerce.Ecommerce.service.ProductService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase( replace= AutoConfigureTestDatabase.Replace.NONE )
@Rollback(false)
public class OrderTest {

    @Autowired
    private OrderService orderService;

    @Autowired
    private ProductService productService;

    @Autowired
    private OrdersLinesService ordersLinesService;

    @Autowired
    private CartService cartService;

    @Test
    public void getOrdersByUserId() {
        int userId = 2;
        List<Order> orders = orderService.ordersByUserid(userId);

        Assertions.assertTrue(orders.size()==1);
    }

    @Test
    public void updateOrderStatus() {
        int orderId = 1067;
        String status = "Delivered";

        orderService.updateStatusByOrderId(orderId, status);

        Optional<Order> order = orderService.findOrderById(orderId) ;

        Assertions.assertEquals( status, order.get().getStatus());

    }

}
