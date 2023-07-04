package com.ecommerce.Ecommerce.entity;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="orders")
public class Order {

    //fields

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="order_id")
    private int orderId;
    @Column(name="user_id")
    private int userId;
    @Column(name="amount")
    private int amount;
    @Column(name="ordered_date")
    private String orderedDate;
    @Column(name="status")
    private String status;
    @Column(name="add_id")
    private int addId;


    //@Column(name="timestamp", columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")

    @CreationTimestamp
    @Column(name="timestamp", nullable = false, updatable = false, insertable = false)
    private Timestamp timestamp ;

    @OneToMany(cascade=CascadeType.ALL)
    @JoinColumn(name="order_id")
    private List<OrdersLines> ordersLines;

    @ManyToOne
    @JoinColumn( name="add_id" , insertable = false, updatable = false)
    private UserAddress userAddress;

//    @OneToMany
//    @JoinColumn( name="add_id" )
//    private List<UserAddress> userAddresses ;

    //constructor

    public Order() {

    }

    public Order(int userId, int amount, String orderedDate, String status) {
        this.userId = userId;
        this.amount = amount;
        this.orderedDate = orderedDate;
        this.status = status;
    }

    //getters and setters

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getOrderedDate() {
        return orderedDate;
    }

    public void setOrderedDate(String orderedDate) {
        this.orderedDate = orderedDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getAddId() {
        return addId;
    }

    public void setAddId(int addId) {
        this.addId = addId;
    }

    public List<OrdersLines> getOrdersLines() {
        return ordersLines;
    }

    public void setOrdersLines(List<OrdersLines> ordersLines) {
        this.ordersLines = ordersLines;
    }

    public UserAddress getUserAddress() {
        return userAddress;
    }

    public void setUserAddress(UserAddress userAddress) {
        this.userAddress = userAddress;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

//    public void setTimestamp(Timestamp timestamp) {
//        this.timestamp = timestamp;
//    }

    /*public List<UserAddress> getUserAddresses() {
        return userAddresses;
    }

    public void setUserAddresses(List<UserAddress> userAddresses) {
        this.userAddresses = userAddresses;
    }*/

    //toString

    @Override
    public String toString() {
        return "Orders{" +
                "orderId=" + orderId +
                ", userId=" + userId +
                ", amount=" + amount +
                ", orderedDate=" + orderedDate +
                ", status='" + status + '\'' +
                '}';
    }

}
