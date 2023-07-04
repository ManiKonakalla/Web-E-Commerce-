package com.ecommerce.Ecommerce.service;

import com.ecommerce.Ecommerce.entity.Order;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrderService {

    public List<Order> findAllOrders() ;

    public Optional<Order> findOrderById(int theId) ;

    public Order saveOrder(Order theOrder) ;

    public void deleteOrderById(int theId) ;

    public List<Order> ordersByUserid(int userid );

    public void updateStatusByOrderId(int orderId, String status ) ;

    public int userAddressOrderCheck( int addId );

    public List<Integer> getRecentOrder ( int userId ) ;
}
