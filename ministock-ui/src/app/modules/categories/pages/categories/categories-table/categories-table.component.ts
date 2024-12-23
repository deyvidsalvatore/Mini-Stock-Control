import { Component, Input } from '@angular/core';
import { AllCategoriesResponse } from '../../../../../shared/interfaces/products/responses/all-categories.response';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.scss'
})
export class CategoriesTableComponent {
  @Input() public categories: Array<AllCategoriesResponse> = [];
  public categorySelected!: AllCategoriesResponse;

}
