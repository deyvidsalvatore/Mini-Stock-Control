import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AllCategoriesResponse } from '../../../../../shared/interfaces/products/responses/all-categories.response';
import { EditCategoryAction } from '../../../../../shared/interfaces/categories/edit-category.action';
import { CategoryEvent } from '../../../../../shared/enums/categories/category.event';
import { DeleteCategoryAction } from '../../../../../shared/interfaces/categories/delete-category.action';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.scss',
})
export class CategoriesTableComponent {
  @Input() public categories: Array<AllCategoriesResponse> = [];
  public categorySelected!: AllCategoriesResponse;
  @Output() public categoryEvent = new EventEmitter<EditCategoryAction>();
  @Output() public deleteCategoryEvent = new EventEmitter<DeleteCategoryAction>();

  public addCategoryAction = CategoryEvent.ADD_CATEGORY_ACTION;
  public editCategoryAction = CategoryEvent.EDIT_CATEGORY_ACTION;


  handleDeleteCategoryEvent(category_id: string, categoryName: string): void {
    if (category_id !== '' && categoryName !== '') {
      this.deleteCategoryEvent.emit({category_id, categoryName});
    }
  }

  handleEditCategory(action: string, id: string, categoryName: string): void {
    this.handleCategoryEvent(action, id, categoryName);
  }

  handleCategoryEvent(action: string, id?: string, categoryName?: string): void {
    if (action && action != '') {
      this.categoryEvent.emit({action, id, categoryName});
    }
  }
}
