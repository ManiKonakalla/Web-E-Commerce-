package com.ecommerce.Ecommerce.service;

import com.ecommerce.Ecommerce.entity.Order;
import com.ecommerce.Ecommerce.repository.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImp implements OrderService {

    @Autowired
    private OrderRepo orderRepo;

    @Override
    @Transactional
    public List<Order> findAllOrders() {
        return orderRepo.findAll();
    }

    @Override
    @Transactional
    public Optional<Order> findOrderById(int theId) {
        return orderRepo.findById(theId);
    }

    @Override
    @Transactional
    public Order saveOrder(Order theOrder) {
        return orderRepo.save(theOrder);
    }

    @Override
    @Transactional
    public void deleteOrderById(int theId) {
        orderRepo.deleteById(theId);
    }

    @Override
    @Transactional
    public List<Order> ordersByUserid(int userid ){
        return orderRepo.ordersByUserid(userid);
    }

    @Override
    @Transactional
    public void updateStatusByOrderId(int orderId, String status ) {
        orderRepo.updateStatusByOrderId(orderId, status);
    }

    @Override
    @Transactional
    public int userAddressOrderCheck(int addId) {
        return orderRepo.userAddressOrderCheck(addId).size();
    }

    @Override
    public List<Integer> getRecentOrder(int userId) {
        return orderRepo.getRecentOrder(userId);
    }
}
