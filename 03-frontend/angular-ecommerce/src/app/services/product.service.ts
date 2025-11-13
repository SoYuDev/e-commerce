import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

// Crea una instancia Singleton de la clase (de manera lazy, no eager loading) y podrá ser inyectada por cualquier clase que lo necesite.
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // URL donde consumiremos la API mediante peticiones HTTP.
  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) {}

  /* Se lanza una petición HTTP GET que devuelve un observable, este no hace nada hasta que es suscrito
  El observable recibe el JSON que viene del backend
  pipe nos permite encadenar operadores RxJS como map, filter...
  map se encarga de transfromar todo el JSON a la parte que nos interesa que es response._embedded.products */
  getProductList(theCategoryId: number): Observable<Product[]> {
    // URL dinámica en función del categoryId
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
  }

  // Muy similar a getProductList pero para obtener las categorias de los productos.
  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient
      .get<GetResponseProduct>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }

  // Obtiene un único producto.
  getProduct(theProductId: number): Observable<Product> {
    // Construir una URL a partir del id del producto
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  // Obtiene un JSON con la paginación de Spring Data Rest
  getProductListPaginate(thePage: number, thePageSize: number, theCategoryId: number): Observable<GetResponseProduct> {
    // URL dinámica en función del categoryId, numero de página y tamaño.
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}` + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }
}

// Como la respuesta del servidor en JSON es más compleja al usar Spring Data REST usamos la interfaz creada GetResponseProduct
/*   {
  "_embedded" : {
    "products" : [ {
      "sku" : "BOOK-TECH-1000",
      "name" : "JavaScript - The Fun Parts",
      "description" : "Learn JavaScript",
      "unitPrice" : 19.99,
      "imageUrl" : "assets/images/products/placeholder.png",
      "active" : true,
      "unitsInStock" : 100,
      "dateCreated" : "2025-11-04T17:32:10.000+00:00",
      "dateUpdated" : null,
      "_links" : {
        "self" : {.......
} */

// Si usasemos controladores normales y JPA sin Spring Data REST se la parte de _embedded desaparecería.
// Básicamente obtiene el JSON sin tener en cuentra el _embedded
interface GetResponseProduct {
  _embedded: {
    products: Product[];
  };
  // PAGINATION - Al añadir la paginación, SPRING DATA REST nos da metadatos en el JSON con la información que nos interesa unwrappear.
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
