package com.ecommerce.Ecommerce.repository;

import com.ecommerce.Ecommerce.entity.OrdersLines;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path="orderslines")
public interface OrdersLinesRepo extends JpaRepository<OrdersLines, Integer> {
}
