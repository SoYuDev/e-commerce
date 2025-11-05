package com.luis.ecommerce.dao;

import com.luis.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

// collectionResourceRel -> Nombre del JSON devuelto path -> .../product-category por defecto sería /productCategories
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
// Para evitar el error de CORS al desarrollar apps full-stack, con esto hacemos que el origen (puerto) sea el mismo.
@CrossOrigin("http://localhost:4200")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}
