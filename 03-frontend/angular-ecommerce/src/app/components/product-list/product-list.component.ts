import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;

  // DI
  // ActivatedRoute nos permite acceder al route parameter que nos interesa (id)
  constructor(
    private _productService: ProductService,
    private route: ActivatedRoute
  ) {}

  // Se ejecuta listProducts la primera vez y después por el subscribe se puede volver a ejecutar.
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  // Ejecutamos la función del servicio y nos suscribimos al Observable para activarlo y acceder a su información (JSON con los productos).
  listProducts() {
    // Comprueba si el param 'id' está disponible.
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // Obtener el 'id' y convertirlo en un número usando el símbolo '+'
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else {
      // Si no tenemos category id devolvemos la categoría 1 por defecto.
      this.currentCategoryId = 1;
    }

    // Obtener los productos específicos a partir del id obtenido
    this._productService.getProductList(this.currentCategoryId).subscribe((data) => {
      this.products = data;
    });
  }
}
