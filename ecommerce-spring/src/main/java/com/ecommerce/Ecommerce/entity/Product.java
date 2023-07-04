package com.ecommerce.Ecommerce.entity;

import javax.persistence.*;
import java.util.Arrays;
import java.util.List;

@Entity
@Table(name="product")
public class Product {

    //fields

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="product_id")
    private int productId;
    @Column(name="category_id")
    private int categoryId;
    @Column(name="title")
    private String title;
    @Column(name="description")
    private String description;
    @Column(name="is_active")
    private Boolean isActive;

    @Lob
    @Column(columnDefinition = "BLOB")
    private byte[] image;

    @Column(name="price")
    private int price;
    @Column(name="stock")
    private int stock;
    @Column(name="owner")
    private String owner;
    @Column(name="productcolor")
    private String productcolor;
    @Column(name="discountname")
    private String discountname;
    @Column(name="discountdescription")
    private String discountdesription;
    @Column(name="discountpercent")
    private int discountpercent;
    @Column(name="productsize")
    private String productsize;


    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name="product_id")
    private List<OrdersLines> ordersLines;

    //constructors

    public Product(){

    }

    public Product(String title, String description, Boolean isActive, byte[] image, int price, int stock, String owner) {
        this.title = title;
        this.description = description;
        this.isActive = isActive;
        this.image = image;
        this.price = price;
        this.stock = stock;
        this.owner = owner;
    }

    //getters and setters


    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getProductcolor() {
        return productcolor;
    }

    public void setProductcolor(String productcolor) {
        this.productcolor = productcolor;
    }

    public String getDiscountname() {
        return discountname;
    }

    public void setDiscountname(String discountname) {
        this.discountname = discountname;
    }

    public String getDiscountdesription() {
        return discountdesription;
    }

    public void setDiscountdesription(String discountdesription) {
        this.discountdesription = discountdesription;
    }

    public int getDiscountpercent() {
        return discountpercent;
    }

    public void setDiscountpercent(int discountpercent) {
        this.discountpercent = discountpercent;
    }

    public String getProductsize() {
        return productsize;
    }

    public void setProductsize(String productsize) {
        this.productsize = productsize;
    }

    public List<OrdersLines> getOrdersLines() {
        return ordersLines;
    }

    public void setOrdersLines(List<OrdersLines> ordersLines) {
        this.ordersLines = ordersLines;
    }

    //toString

    @Override
    public String toString() {
        return "Products{" +
                "productId=" + productId +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", isActive=" + isActive +
                ", image=" + Arrays.toString(image) +
                ", price=" + price +
                ", stock=" + stock +
                ", owner='" + owner + '\'' +
                '}';
    }

}
