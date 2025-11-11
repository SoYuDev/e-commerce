import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

// Cuando el path matchea crea una nueva instancia del componente 'ProductListComponent'.
export const routes: Routes = [
    {path: 'products/:id', component: ProductDetailsComponent},
    {path: 'search/:keyword', component: ProductListComponent},
    //Pasamos el parámetro id de la URL (Path Variable) al componente
    {path: 'category/:id/:name', component: ProductListComponent},
    {path: 'category', component: ProductListComponent},
    {path: 'products', component: ProductListComponent},
    // Si introducimos un path vacío redirige a /products
    {path: '', redirectTo: '/products', pathMatch: 'full'},
    // Si introducen cualquier path diferente a los anteriores redirige a /products
    {path: '**', redirectTo: '/products', pathMatch: 'full'}
];
