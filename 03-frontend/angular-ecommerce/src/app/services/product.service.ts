import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';

// Crea una instancia Singleton de la clase (de manera lazy, no eager loading) y podrá ser inyectada por cualquier clase que lo necesite.
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // URL donde consumiremos la API mediante peticiones HTTP.
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) {}

  /* Se lanza una petición HTTP GET que devuelve un observable, este no hace nada hasta que es suscrito
  El observable recibe el JSON que viene del backend
  pipe nos permite encadenar operadores RxJS como map, filter...
  map se encarga de transfromar todo el JSON a la parte que nos interesa que es response._embedded.products */
  getProductList(): Observable<Product[]> {
    return this.httpClient
      .get<GetResponse>(this.baseUrl)
      .pipe(map((response) => response._embedded.products));
  }
}

// Como la respuesta del servidor en JSON es más compleja al usar Spring Data REST usamos la interfaz creada GetResponse
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
interface GetResponse {
  _embedded: {
    products: Product[];
  };
}
