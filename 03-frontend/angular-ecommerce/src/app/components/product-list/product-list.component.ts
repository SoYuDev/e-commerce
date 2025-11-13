import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryid: number = 1;
  currentCategoryName: string = '';
  searchMode: boolean = false;

  // PAGINATION PROPERTIES
  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;

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
    // Comprobamos si el param 'keyword' está
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    this._productService.searchProducts(theKeyword).subscribe((data) => {
      this.products = data;
    });
  }

  handleListProducts() {
    // Comprueba si el param 'id' está disponible.
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // Obtener el 'id' y convertirlo en un número usando el símbolo '+'
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;

      // Obtiene el "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    } else {
      // Si no tenemos category id devolvemos la categoría 1 por defecto.
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }

    // Comprobamos si la categoría es diferente a la anterior para setear thePageNumber a 1
    if (this.previousCategoryid != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryid = this.currentCategoryId;

    console.log(
      `currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`
    );

    // Obtener la lista de productos con paginación, restamos -1 porque en Angular la paginación empieza en 1 y en Spring Boot en 0.
    this._productService
      .getProductListPaginate(this.thePageNumber - 1, this.thePageSize, this.currentCategoryId)
      .subscribe((data) => {
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number + 1;
        this.thePageSize = data.page.size;
      });
  }
}
