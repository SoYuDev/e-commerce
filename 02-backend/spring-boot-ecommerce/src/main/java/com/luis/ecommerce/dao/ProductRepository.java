package com.luis.ecommerce.dao;

import com.luis.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

// Para evitar el error de CORS al desarrollar apps full-stack, con esto hacemos que el origen (puerto) sea el mismo.
@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {
}
