package com.ecommerce.Ecommerce.service;


import com.ecommerce.Ecommerce.entity.Product;
import com.ecommerce.Ecommerce.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImp implements ProductService {

    @Autowired
    private ProductRepo productRepo ;

    @Override
    @Transactional
    public List<Product> findAllProducts() {
        return productRepo.findAll();
    }

    @Override
    @Transactional
    public Optional<Product> findProductById(int theId) {
        return productRepo.findById(theId);
    }

    @Override
    @Transactional
    public Product saveProduct(Product theProduct) {
        return productRepo.save(theProduct);
    }

    @Override
    @Transactional
    public void deleteProductById(int theId) {
        productRepo.deleteById(theId);
    }

    @Override
    @Transactional
    public List<Product> productListbycatid(int categoryid, int offsetvalue){ return productRepo.productListbycatid(categoryid,offsetvalue); };

    @Override
    @Transactional
    public Product  saveProductToDB(MultipartFile file, String name, String description
            , int price, int quantity, int categoryId, Boolean active)
    {
        Product p = new Product();
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        if(fileName.contains(".."))
        {
            System.out.println("not a a valid file");
        }
        try {
            //Base64.getEncoder().encode(file.getBytes())
            p.setImage(file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
        p.setDescription(description);
        p.setTitle(name);
        p.setPrice(price);
        p.setDescription(description);
        p.setStock(quantity);
        p.setCategoryId(categoryId);
        p.setActive(active);
        return productRepo.save(p);
    }

    @Override
    @Transactional
    public void updateProduct(int productId, int categoryId, String title, String description, int price, int stock, Boolean active) {
        productRepo.updateProduct(productId, categoryId, title, description, price, stock, active);
    }

    @Override
    @Transactional
    public void updateProductStock(int productId, int stockvalue) {
        productRepo.updateProductStock(productId, stockvalue);
    }

    @Override
    @Transactional
    public void deactivateProduct(int productId) {
        productRepo.deactivateProduct(productId);
    }
}
