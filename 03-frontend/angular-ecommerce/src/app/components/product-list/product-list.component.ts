import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  // DI
  constructor(private _productService: ProductService) {}

  ngOnInit(): void {
    this.listProducts();
  }

  // Ejecutamos la función del servicio y nos suscribimos al Observable para activarlo y acceder a su información (JSON con los productos).
  listProducts() {
    this._productService.getProductList().subscribe((data) => {
      this.products = data;
    });
  }
}
