package com.ecommerce.Ecommerce.controller;

import com.ecommerce.Ecommerce.entity.Order;
import com.ecommerce.Ecommerce.entity.OrdersLines;
import com.ecommerce.Ecommerce.service.OrderService;
import com.ecommerce.Ecommerce.service.OrdersLinesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/ecommerce")
public class OrdersLinesController {

    @Autowired
    private OrdersLinesService orderLinesService;

    @GetMapping("/orderslines")
    public List<OrdersLines> getorderlines() {
        return orderLinesService.findAllOrderlines();
    }

    @GetMapping("/orderslines/{orderlineId}")
    public Optional<OrdersLines> getorderlineById(@PathVariable int orderlineId ) {
        return orderLinesService.findOrderlineById(orderlineId);
    }

    @PostMapping("/orderslines")
    public OrdersLines saveorderline(@RequestBody OrdersLines theorderline) {
        return orderLinesService.saveOrderline(theorderline);
    }

    @PutMapping("/orderslines")
    public OrdersLines updateorderline(@RequestBody OrdersLines theorderline) {
        return orderLinesService.saveOrderline(theorderline) ;
    }

    @DeleteMapping("/orderslines/{orderlineId}")
    public void deleteorderline(@PathVariable int orderlineId) {
        orderLinesService.deleteOrderlineById(orderlineId);
    }
}
