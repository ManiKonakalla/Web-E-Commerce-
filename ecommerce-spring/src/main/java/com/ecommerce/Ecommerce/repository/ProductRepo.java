package com.ecommerce.Ecommerce.repository;

import com.ecommerce.Ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductRepo extends JpaRepository<Product,Integer> {

    @Query(nativeQuery = true,
            value="select * from Product p where p.category_id like ?1 order by p.product_id limit 1000 offset ?2")
    List<Product> productListbycatid(@Param("categoryid") int categoryid, @Param("offsetvalue") int offsetvalue);


    @Modifying
    @Query("update Product p set p.categoryId=:categoryId, " +
            "p.title=:title, " +
            "p.description=:description, " +
            "p.price=:price, " +
            "p.stock=:stock, " +
            "p.isActive=:active "+
            "where p.productId=:productId ")
    public void updateProduct(@Param("productId") int productId,
                              @Param("categoryId") int categoryId,
                              @Param("title") String title,
                              @Param("description") String description,
                              @Param("price") int price,
                              @Param("stock") int stock,
                              @Param("active") Boolean active);

    @Modifying
    @Query("update Product p set p.stock=:stockvalue where p.productId=:productId")
    public void updateProductStock(@Param("productId") int productId, @Param("stockvalue") int stockvalue) ;

    @Modifying
    @Query("update Product p set p.isActive=false where p.productId=:productId")
    public void deactivateProduct( @Param("productId") int productId ) ;
}
