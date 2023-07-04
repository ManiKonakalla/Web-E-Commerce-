package com.ecommerce.Ecommerce.entity;

import java.util.List;

public class PlaceOrder {

    public Order order;
    public List<OrdersLines> ordersLines;

    public PlaceOrder(Order order, List<OrdersLines> ordersLines) {
        this.order = order;
        this.ordersLines = ordersLines;
    }
}
