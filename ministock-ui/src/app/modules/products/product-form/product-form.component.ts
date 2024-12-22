import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CategoriesService } from '../../../core/services/categories.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AllCategoriesResponse } from '../../../shared/interfaces/products/responses/all-categories.response';
import { CreateProductRequest } from '../../../shared/interfaces/products/requests/create-product.request';
import { ProductsService } from '../../../core/services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();
  public categories: AllCategoriesResponse[] = [];
  public selectedCategory: Array<{name: string, code: string}> = [];

  constructor(
    private categoriesService: CategoriesService,
    private fb: FormBuilder,
    private productService: ProductsService,
    private messageService: MessageService,
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
    this.categoriesService
      .getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.categories = response;
          }
        },
      });
  }

  handleSubmitAddProduct(): void {
    if(this.addProductForm?.value && this.addProductForm?.valid) {
      const requestCreateProduct: CreateProductRequest = {
        name: this.addProductForm.value.name as string,
        price: this.addProductForm.value.price as string,
        description: this.addProductForm.value.description as string,
        category_id: this.addProductForm.value.category_id as string,
        amount: this.addProductForm.value.amount as number
      };
      this.productService.createProduct(requestCreateProduct)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Product created successfully!',
                life: 1500
              })
              this.router.navigate(['/products']);
            }
          },
          error: (err) => {
            console.log(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'An error has occurred!',
              life: 1500
            })
          }
        })
    }

    this.addProductForm.reset();
  }

  public addProductForm = this.fb.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    category_id: ['', Validators.required],
    amount: [0, Validators.required],
  });
}
