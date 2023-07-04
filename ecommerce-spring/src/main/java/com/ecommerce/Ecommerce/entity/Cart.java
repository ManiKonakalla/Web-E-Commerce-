package com.ecommerce.Ecommerce.entity;

import javax.persistence.*;

@Entity
@Table(name="cart")
public class Cart {

    //fields

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="cart_id")
    private int cartId;
    @Column(name="user_id")
    private int userId;
    @Column(name="product_id")
    private int productId;
    @Column(name="quantity")
    private int quantity;
    @Column(name="price")
    private int price;

    //constructors

    public Cart() {

    }

    public Cart(int userId, int productId, int quantity, int price) {
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
    }

    //getters and setters

    public int getCartId() {
        return cartId;
    }

    public void setCartId(int cartId) {
        this.cartId = cartId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

}
