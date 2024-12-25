import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { CategoriesService } from '../../../../../core/services/categories.service';
import { CategoryEvent } from '../../../../../shared/enums/categories/category.event';
import { EditCategoryAction } from '../../../../../shared/interfaces/categories/edit-category.action';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss'],
})
export class CategoriesFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  public addCategoryAction = CategoryEvent.ADD_CATEGORY_ACTION;
  public editCategoryAction = CategoryEvent.EDIT_CATEGORY_ACTION;

  public categoryAction!: EditCategoryAction;
  public categoryForm = this.formBuilder.group({
    name: ['', Validators.required],
  });

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    console.log('DynamicDialogConfig data:', this.config.data);

    this.categoryAction = this.config.data;

    if (this.categoryAction?.action === this.editCategoryAction) {
      this.setCategoryName(this.categoryAction.categoryName as string);
    }
  }

  handleSubmitCategoryAction(): void {
    if (this.categoryAction?.action === this.addCategoryAction) {
      this.handleSubmitAddCategory();
    } else if (this.categoryAction?.action === this.editCategoryAction) {
      this.handleSubmitEditCategory();
    }
  }

  handleSubmitAddCategory(): void {
    if (this.categoryForm?.valid) {
      const requestCreateCategory = {
        name: this.categoryForm.value.name as string,
      };

      this.categoriesService
        .createNewCategory(requestCreateCategory)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Categoria criada com sucesso!',
              life: 3000,
            });
            this.ref.close();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao criar categoria!',
              life: 3000,
            });
          },
        });
    }
  }

  handleSubmitEditCategory(): void {
    if (this.categoryForm?.valid && this.categoryAction?.id) {
      const requestEditCategory = {
        name: this.categoryForm.value.name as string,
        category_id: this.categoryAction.id,
      };

      this.categoriesService
        .editCategory(requestEditCategory)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Categoria editada com sucesso!',
              life: 3000,
            });
            this.ref.close();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao editar categoria!',
              life: 3000,
            });
          },
        });
    }
  }

  setCategoryName(categoryName: string): void {
    this.categoryForm.setValue({
      name: categoryName,
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
