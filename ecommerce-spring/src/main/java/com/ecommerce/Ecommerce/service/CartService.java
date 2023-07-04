package com.ecommerce.Ecommerce.service;

import com.ecommerce.Ecommerce.entity.Cart;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CartService {

    public List<Cart> findAllCartitems();

    public Optional<Cart> findCartById(int theId);

    public Cart saveCart(Cart theCart);

    public void deleteCartById(int theId);

    List<Cart> cartByUserid(int userid );

    public void deleteCartByUserid( int userid );

}
