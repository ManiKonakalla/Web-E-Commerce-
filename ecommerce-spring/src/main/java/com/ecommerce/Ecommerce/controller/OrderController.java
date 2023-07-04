package com.ecommerce.Ecommerce.controller;

import com.ecommerce.Ecommerce.entity.Order;
import com.ecommerce.Ecommerce.entity.OrdersLines;
import com.ecommerce.Ecommerce.entity.PlaceOrder;
import com.ecommerce.Ecommerce.entity.Product;
import com.ecommerce.Ecommerce.service.CartService;
import com.ecommerce.Ecommerce.service.OrderService;
import com.ecommerce.Ecommerce.service.OrdersLinesService;
import com.ecommerce.Ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/ecommerce")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private ProductService productService;

    @Autowired
    private OrdersLinesService ordersLinesService;

    @Autowired
    private CartService cartService ;

    @GetMapping("/orders")
    public List<Order> getorder() {
        return orderService.findAllOrders();
    }

    @GetMapping("/orders/{orderId}")
    public Optional<Order> getorderById(@PathVariable int orderId ) {
        return orderService.findOrderById(orderId);
    }

    @PostMapping("/orders")
    public Order saveorder(@RequestBody Order theorder) {
        return orderService.saveOrder(theorder);
    }

    @PutMapping("/orders")
    public Order updateorder(@RequestBody Order theorder) {
        return orderService.saveOrder(theorder) ;
    }

    @DeleteMapping("/orders/{orderId}")
    public void deleteorder(@PathVariable int orderId) {
        orderService.deleteOrderById(orderId);
    }

    @GetMapping("/ordersbyuserid/{userid}")
    public List<Order> getOrdersbyuserid(@PathVariable int userid) {
        return orderService.ordersByUserid(userid);
    }

    @PutMapping("/updateStatusByOrderId")
    public void updateStatusByOrderId(@RequestParam int orderId, @RequestParam String status ) {
        orderService.updateStatusByOrderId(orderId, status);
    }

    @PostMapping("/saveOrder")
    public List<Boolean> saveOrders(@RequestBody PlaceOrder theorder) {

        List<Boolean> flag = new ArrayList<Boolean>();
        int check = 0;
        Optional<Product> theproduct;
        int quantity = 0 ;
        for ( int i=0; i<theorder.ordersLines.size(); i++ ) {
            theproduct = productService.findProductById(theorder.ordersLines.get(i).getProductId());
            quantity = theorder.ordersLines.get(i).getQuantity();
            if( quantity>theproduct.get().getStock() ) {
                flag.add(i , false);
                check = 1;
            }
            else {
                flag.add(i , true);
            }
        }

        if( check == 0 ) {

            Order neworder = orderService.saveOrder(theorder.order);
            int orderId = neworder.getOrderId();
            OrdersLines theorderline ;
            int productstock = 0;
            for( int i=0; i<theorder.ordersLines.size(); i++ ) {
                theorderline = new OrdersLines( theorder.ordersLines.get(i).getProductId(), orderId, theorder.ordersLines.get(i).getQuantity() ) ;
                OrdersLines neworderline =  ordersLinesService.saveOrderline(theorderline);
                productstock = productService.findProductById(theorder.ordersLines.get(i).getProductId()).get().getStock();
                productService.updateProductStock(theorder.ordersLines.get(i).getProductId(), productstock-theorder.ordersLines.get(i).getQuantity());
            }
            cartService.deleteCartByUserid(neworder.getUserId());
        }

        return flag;
    }

    @PutMapping("/getRecentOrder")
    public int getRecentOrder(@RequestParam("userId") int userId ) {
            return orderService.getRecentOrder(userId).get(0);
    }
}
