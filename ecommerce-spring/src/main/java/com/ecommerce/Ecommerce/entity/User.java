package com.ecommerce.Ecommerce.entity;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Arrays;
import java.util.List;

@Entity
@Table(name="user")
public class User {

    //fields

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private int userId;
    @Column(name="username")
    private String username;
    @Column(name="password")
    private String password;
    @Column(name="role")
    private String role;
    @Column(name="profile")
    private byte[] profile;
    @Column(name="first_name")
    private String firstName ;
    @Column(name="last_name")
    private String lastName;
    @Column(name="gender")
    private String gender;
    @Column(name="phonenumber")
    private String phonenumber;

    @CreationTimestamp
    @Column(name="timestamp", nullable = false, updatable = false, insertable = false)
    private Timestamp timestamp ;


    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="user_id")
    private List<Order> orders;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="user_id")
    private List<UserAddress> addresslist ;

    //constructors

    public User() {

    }

    public User(String username, String password, String role, byte[] profile, String firstName, String lastName, String gender, String phonenumber) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.profile = profile;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.phonenumber = phonenumber;
    }

    //getters and setters

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public byte[] getProfile() {
        return profile;
    }

    public void setProfile(byte[] profile) {
        this.profile = profile;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    public List<UserAddress> getAddresslist() {
        return addresslist;
    }

    public void setAddresslist(List<UserAddress> addresslist) {
        this.addresslist = addresslist;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

//    public void setTimestamp(Timestamp timestamp) {
//        this.timestamp = timestamp;
//    }

    //toString

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                ", profile=" + Arrays.toString(profile) +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", gender='" + gender + '\'' +
                ", phonenumber='" + phonenumber + '\'' +
                '}';
    }

}
