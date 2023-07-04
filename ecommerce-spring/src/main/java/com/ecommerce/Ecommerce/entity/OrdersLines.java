package com.ecommerce.Ecommerce.entity;

import javax.persistence.*;

@Entity
@Table(name="orders_lines")
public class OrdersLines {

    //fields

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="order_line_id")
    private int orderLineId;
    @Column(name="product_id")
    private int productId;
    @Column(name="order_id")
    private int orderId;
    @Column(name="quantity")
    private int quantity;

    //constructors

    public OrdersLines() {

    }

    public OrdersLines(int productId, int orderId, int quantity) {
        this.productId = productId;
        this.orderId = orderId;
        this.quantity = quantity;
    }

    //getters and setters

    public int getOrderLineId() {
        return orderLineId;
    }

    public void setOrderLineId(int orderLineId) {
        this.orderLineId = orderLineId;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }


    //toString

    @Override
    public String toString() {
        return "OrdersLines{" +
                "orderLineId=" + orderLineId +
                ", productId=" + productId +
                ", orderId=" + orderId +
                ", quantity=" + quantity +
                '}';
    }
}
