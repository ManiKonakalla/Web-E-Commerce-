package com.ecommerce.Ecommerce.service;

import com.ecommerce.Ecommerce.entity.OrdersLines;

import java.util.List;
import java.util.Optional;

public interface OrdersLinesService {

    public List<OrdersLines> findAllOrderlines() ;

    public Optional<OrdersLines> findOrderlineById(int theId) ;

    public OrdersLines saveOrderline(OrdersLines theOrderLines) ;

    public void deleteOrderlineById(int theId) ;

}
