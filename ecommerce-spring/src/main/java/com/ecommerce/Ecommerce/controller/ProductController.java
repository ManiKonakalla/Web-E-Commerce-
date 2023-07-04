package com.ecommerce.Ecommerce.controller;

import com.ecommerce.Ecommerce.entity.Category;
import com.ecommerce.Ecommerce.entity.Product;
import com.ecommerce.Ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/ecommerce")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/products")
    public List<Product> getProduct() {
        return productService.findAllProducts();
    }

    @GetMapping("/products/{productId}")
    public Optional<Product> getProductById(@PathVariable int productId ) {
        return productService.findProductById(productId);
    }

    @PostMapping("/products")
    public Product saveProduct(@RequestBody Product theProduct) {
        return productService.saveProduct(theProduct);
    }

    @PutMapping("/products")
    public Product updateProduct(@RequestBody Product theproduct) {
        return productService.saveProduct(theproduct) ;
    }

    @DeleteMapping("/products/{productId}")
    public void deleteProduct(@PathVariable int productId) {
        productService.deleteProductById(productId);
    }

    @GetMapping("/productsbycatid/{categoryid}/{offsetvalue}")
    List<Product> productList(@PathVariable int categoryid, @PathVariable int offsetvalue){
        List<Product> theproduct;
        theproduct = productService.productListbycatid(categoryid, offsetvalue);
        return theproduct;
    };

    @PostMapping("/addP")
    public Product saveProduct(@RequestParam("file") MultipartFile file,
                            @RequestParam("pname") String name,
                            @RequestParam("description") String description,
                            @RequestParam("price") int price,
                            @RequestParam("quantity") int quantity,
                            @RequestParam("categoryid") int categoryId,
                            @RequestParam("active") Boolean active
    )
    {
        return productService.saveProductToDB(file, name, description, price, quantity, categoryId, active);
    }

    @PutMapping("/updateProduct")
    public void updateProduct( @RequestParam("productId") int productId,
                               @RequestParam("categoryId") int categoryId,
                               @RequestParam("title") String title,
                               @RequestParam("description") String description,
                               @RequestParam("price") int price,
                               @RequestParam("stock") int stock,
                               @RequestParam("active") Boolean active){
        productService.updateProduct(productId, categoryId, title, description, price, stock, active);
    }

    @PutMapping("/updateProductStock")
    public void updateProductStock( @RequestParam("productId") int productId,
                                    @RequestParam("stockvalue") int stockvalue) {
        productService.updateProductStock(productId, stockvalue);
    }

    @PutMapping("/deactivateProduct")
    public void deactivateProduct( @RequestParam("productId") int productId ) {
        productService.deactivateProduct(productId);
    }
}
