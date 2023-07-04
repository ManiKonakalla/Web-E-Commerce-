package com.ecommerce.Ecommerce.repository;

import com.ecommerce.Ecommerce.entity.Cart;
import com.ecommerce.Ecommerce.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartRepo extends JpaRepository<Cart, Integer> {

    @Query("select c from Cart c where c.userId=:userid")
    public List<Cart> cartByUserid(@Param("userid") int userid );

    @Modifying
    @Query("delete from Cart c where c.userId=:userid")
    public void deleteCartByUserid( @Param("userid") int userid );

}
