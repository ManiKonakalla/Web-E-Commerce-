package com.ecommerce.Ecommerce.entity;

import javax.persistence.*;
import java.util.Arrays;
import java.util.List;

@Entity
@Table(name="category")
public class Category {

    //fields

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="category_id")
    private int categoryId ;
    @Column(name="image")
    private byte[] image;
    @Column(name="title")
    private String title;
    @Column(name="description")
    private String description;
    @Column(name="is_active")
    private Boolean isActive;

    @OneToMany(cascade=CascadeType.ALL)
    @JoinColumn(name="category_id")
    private List<Product> products;

    //constructors

    public Category() {

    }

    public Category(byte[] image, String title, String description, Boolean isActive) {
        this.image = image;
        this.title = title;
        this.description = description;
        this.isActive = isActive;
    }

    //getters and setters

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
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

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    //toString

    @Override
    public String toString() {
        return "Category{" +
                "categoryId=" + categoryId +
                ", image=" + Arrays.toString(image) +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", isActive=" + isActive +
                '}';
    }

}
