import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AllCategoriesResponse } from '../../../../shared/interfaces/products/responses/all-categories.response';
import { DeleteCategoryAction } from '../../../../shared/interfaces/categories/delete-category.action';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();
  public categoriesData!: Array<AllCategoriesResponse>;

  constructor(
    private categoriesService: CategoriesService,
    private dialogService: DialogService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getAllCategories() {
    this.categoriesService.getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.categoriesData = response;
          }
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error on search categories',
            life: 2500
          });
          this.router.navigate(['/dashboard']);
        }
      });
  }

  handleDeleteCategory(event: DeleteCategoryAction): void {
    if (event) {
      this.confirmationService.confirm({
        message: `You want to delete category ${event?.categoryName}`,
        header: 'Category Deletion Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Confirm',
        rejectLabel: 'Cancel',
        accept: () => this.deleteCategory(event?.category_id)
      })
    }
  }

  deleteCategory(category_id: string): void {
    if (category_id) {
      this.categoriesService
        .deleteCategory({ category_id })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Category was removed successfully!',
              life: 3000,
            });
            this.getAllCategories();
            this.router.navigate(['/categories']);
          },
          error: (err: Error) => {
            console.log(err);
            this.getAllCategories();
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error on removing an category',
              life: 3000,
            });
          },
        });

      this.getAllCategories();
    }
  }

}
