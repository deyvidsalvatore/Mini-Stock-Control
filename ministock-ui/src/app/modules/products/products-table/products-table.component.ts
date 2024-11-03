import { Component, Input } from '@angular/core';
import { IAllProductsResponse } from '../../../shared/interfaces/products/responses/all-products.response';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss'
})
export class ProductsTableComponent {
  @Input() products: Array<IAllProductsResponse> = [];
  public productSelected!: IAllProductsResponse;

}
