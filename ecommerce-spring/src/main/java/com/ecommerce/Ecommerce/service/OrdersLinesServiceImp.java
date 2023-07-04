package com.ecommerce.Ecommerce.service;

import com.ecommerce.Ecommerce.entity.OrdersLines;
import com.ecommerce.Ecommerce.repository.OrdersLinesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class OrdersLinesServiceImp implements OrdersLinesService {

    @Autowired
    private OrdersLinesRepo ordersLinesRepo ;

    @Override
    @Transactional
    public List<OrdersLines> findAllOrderlines() {
        return ordersLinesRepo.findAll();
    }

    @Override
    @Transactional
    public Optional<OrdersLines> findOrderlineById(int theId) {
        return ordersLinesRepo.findById(theId);
    }

    @Override
    @Transactional
    public OrdersLines saveOrderline(OrdersLines theOrderLines) {
        return ordersLinesRepo.save(theOrderLines);
    }

    @Override
    @Transactional
    public void deleteOrderlineById(int theId) {
        ordersLinesRepo.deleteById(theId);
    }
}
