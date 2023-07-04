package com.ecommerce.Ecommerce.service;

import com.ecommerce.Ecommerce.entity.Product;
import org.springframework.data.repository.query.Param;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    public List<Product> findAllProducts() ;

    public Optional<Product> findProductById(int theId) ;

    public Product saveProduct(Product theProduct) ;

    public void deleteProductById(int theId) ;

    public List<Product> productListbycatid(int categoryid, int offsetvalue);

    public Product saveProductToDB(MultipartFile file, String name, String description
            , int price, int quantity, int categoryId, Boolean active);

    public void updateProduct(int productId, int categoryId, String title, String description, int price, int stock, Boolean active);

    public void updateProductStock(int productId, int stockvalue) ;

    public void deactivateProduct(  int productId ) ;

}
