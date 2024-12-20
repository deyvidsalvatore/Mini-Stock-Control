import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IAllProductsResponse } from '../../../shared/interfaces/products/responses/all-products.response';
import { ProductEvent } from '../../../shared/enums/products/product.event';
import { EventAction } from '../../../shared/interfaces/products/event-actions';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss'
})
export class ProductsTableComponent {
  @Input() products: Array<IAllProductsResponse> = [];
  @Output() productEvent = new EventEmitter<EventAction>();

  public productSelected!: IAllProductsResponse;
  public addProductEvent = ProductEvent.ADD_PRODUCT_EVENT;
  public editProductEvent = ProductEvent.EDIT_PRODUCT_EVENT;

  handleProductEvent(action: string, id?: string): void {
    if (action && action !== '') {
      const productEventData = id && id !== '' ? { action, id } : { action };
      this.productEvent.emit(productEventData);
    }
  }
}
