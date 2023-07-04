package com.ecommerce.Ecommerce.controller;

import com.ecommerce.Ecommerce.entity.Cart;
import com.ecommerce.Ecommerce.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/ecommerce")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/cart")
    public List<Cart> getCartitems() {
        return cartService.findAllCartitems();
    }

    @GetMapping("/cart/{cartId}")
    public Optional<Cart> getCartById(@PathVariable int cartId) {
        return cartService.findCartById(cartId);
    }

    @PostMapping("/cart")
    public Cart saveCart(@RequestBody Cart theCart) {
        return cartService.saveCart(theCart);
    }

    @PutMapping("/cart")
    public Cart updateCart(@RequestBody Cart theCart) {
        return cartService.saveCart(theCart);
    }

    @DeleteMapping("/cart/{cartId}")
    public void deleteCart(@PathVariable int cartId) {
        cartService.deleteCartById(cartId);
    }

    @GetMapping("/cartbyuserid/{userId}")
    public List<Cart> cartItemsByUserid(@PathVariable int userId) {
        return cartService.cartByUserid(userId);
    }

    @DeleteMapping("/cartbyuserid/{userid}")
    public void deleteCartByUserid(@PathVariable int userid) {
        cartService.deleteCartByUserid(userid);
    }

}
