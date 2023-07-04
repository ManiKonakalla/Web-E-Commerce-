package com.ecommerce.Ecommerce;

import com.ecommerce.Ecommerce.entity.Product;
import com.ecommerce.Ecommerce.service.ProductService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.Rollback;

import java.util.List;
import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase( replace= AutoConfigureTestDatabase.Replace.NONE )
@Rollback(false)
public class ProductTest {

    @Autowired
    private ProductService productService;

    @Test
    public void getProductsByCategoryId() {

        int categoryid = 120 ;

        List<Product> products;
        products = productService.productListbycatid(categoryid, 0);
        Assertions.assertTrue(products.size()==2);
    }

    @Test
    public void updateProduct() {

        int productId = 217 ;
        int categoryId = 112;
        String title = "The HarryPotter" ;
        String description = "All 7 parts";
        int price = 3500;
        int stock = 2000;

        productService.updateProduct(productId, categoryId, title, description, price, stock, true);

        Optional<Product> theproduct = productService.findProductById(productId) ;
        
        Assertions.assertEquals( productId, theproduct.get().getProductId() );
        Assertions.assertEquals( categoryId, theproduct.get().getCategoryId() );
        Assertions.assertEquals( title, theproduct.get().getTitle() );
        Assertions.assertEquals( description, theproduct.get().getDescription() );
        Assertions.assertEquals( price, theproduct.get().getPrice() );
        Assertions.assertEquals( stock, theproduct.get().getStock() );
    }

    @Test
    public void updateProductStock() {

        int productId = 217;
        int stockvalue = 2;

        productService.updateProductStock(productId, stockvalue);

        Optional<Product> theproduct = productService.findProductById(productId);

        Assertions.assertEquals( stockvalue, theproduct.get().getStock());

    }

    @Test
    public void saveProduct() {

//        MultipartFile image = new MockMultipartFile( "file" "hello".getBytes());
        MockMultipartFile image
                = new MockMultipartFile(
                "file",
                "hello.txt",
                MediaType.TEXT_PLAIN_VALUE,
                "check, check!".getBytes()
        );

        String name = "product 2";
        String description = "p1";
        int price = 300;
        int quantity = 20;
        int categoryId = 112;

        Product theproduct = productService.saveProductToDB(image, name, description, price, quantity, categoryId, true);

        Assertions.assertEquals( categoryId, theproduct.getCategoryId() );
        Assertions.assertEquals( name, theproduct.getTitle() );
        Assertions.assertEquals( description, theproduct.getDescription() );
        Assertions.assertEquals( price, theproduct.getPrice() );
        Assertions.assertEquals( quantity, theproduct.getStock() );
    }

    @Test
    public void deactivateProduct() {

        int productId = 217;
        productService.deactivateProduct(productId);
        Optional<Product> product = productService.findProductById(productId);
        Assertions.assertEquals((product.get().getActive()), false);
    }

    @Test
    public void updateStock() {
        int productId = 217;
        int stock = 5;
        productService.updateProductStock(productId, stock) ;
        Optional<Product> product = productService.findProductById(productId);
        Assertions.assertEquals(product.get().getStock(), stock);
    }

}
