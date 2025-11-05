import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Crea una instancia Singleton de la clase (de manera lazy, no eager loading) y podrá ser inyectada por cualquier clase que lo necesite.
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
}
