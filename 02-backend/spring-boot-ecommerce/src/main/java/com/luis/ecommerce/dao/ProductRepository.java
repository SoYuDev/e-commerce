package com.luis.ecommerce.dao;

import com.luis.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

// Para evitar el error de CORS al desarrollar apps full-stack, con esto hacemos que el origen (puerto) sea el mismo.
@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {
    // SELECT * FROM product where category_id = ?; 
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);

    // SELECT * FROM product p where p.name LIKE CONCAT('%', :name, '%');
    Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);
}
