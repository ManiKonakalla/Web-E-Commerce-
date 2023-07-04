package com.ecommerce.Ecommerce.service;

import com.ecommerce.Ecommerce.entity.Cart;
import com.ecommerce.Ecommerce.repository.CartRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImp implements CartService {

    @Autowired
    private CartRepo cartRepo;

    @Override
    @Transactional
    public List<Cart> findAllCartitems() {
        return cartRepo.findAll();
    }

    @Override
    @Transactional
    public Optional<Cart> findCartById(int theId) {
        return cartRepo.findById(theId);
    }

    @Override
    @Transactional
    public Cart saveCart(Cart theCart) {
        return cartRepo.save(theCart);
    }

    @Override
    @Transactional
    public void deleteCartById(int theId) {
        cartRepo.deleteById(theId);
    }

    @Override
    @Transactional
    public List<Cart> cartByUserid(int userid ){
        return cartRepo.cartByUserid(userid);
    }

    @Override
    @Transactional
    public void deleteCartByUserid( int userid ){
        cartRepo.deleteCartByUserid(userid);
    }

}
