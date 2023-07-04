package com.ecommerce.Ecommerce.repository;

import com.ecommerce.Ecommerce.entity.Cart;
import com.ecommerce.Ecommerce.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(path="order")
public interface OrderRepo extends JpaRepository<Order, Integer> {


    @Query("select o from Order o where o.userId=:userid")
    public List<Order> ordersByUserid(@Param("userid") int userid );

    @Modifying
    @Query("Update Order o set o.status=:status where o.orderId=:orderId ")
    public void updateStatusByOrderId(@Param("orderId") int orderId, @Param("status") String status ) ;

    @Query("select o from Order o where o.addId=:addId")
    public List<Order> userAddressOrderCheck( @Param("addId") int addId );

    @Query(" select o.orderId from Order o where o.userId=:userId order by o.timestamp desc ")
    public List<Integer> getRecentOrder(@Param("userId") int userId ) ;
}
