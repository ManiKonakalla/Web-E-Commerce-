package com.ecommerce.Ecommerce.entity;

import javax.persistence.*;

@Entity
@Table(name="useraddress")
public class UserAddress {

    //fields

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="add_id")
    private int addId;
    @Column(name="user_id")
    private int userId;
    @Column(name="name")
    private String name;
    @Column(name="hno")
    private String hno;
    @Column(name="street")
    private String street;
    @Column(name="city")
    private String city;
    @Column(name="state")
    private String state;
    @Column(name="pincode")
    private String pincode;
    @Column(name="phonenumber")
    private String phonenumber;
    @Column(name="country")
    private String country;
    @Column(name="bill")
    private Boolean bill;

    //constructors

    public UserAddress() {

    }

    //getter and setters

    public int getAddId() {
        return addId;
    }

    public void setAddId(int addId) {
        this.addId = addId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHno() {
        return hno;
    }

    public void setHno(String hno) {
        this.hno = hno;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public Boolean getBill() {
        return bill;
    }

    public void setBill(Boolean bill) {
        this.bill = bill;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}
