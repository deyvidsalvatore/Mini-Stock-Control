import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from '../../core/services/products.service';
import { ProductDataTransferService } from '../../shared/services/products-data-transfer.service';
import { Router } from '@angular/router';
import { IAllProductsResponse } from '../../shared/interfaces/products/responses/all-products.response';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EventAction } from '../../shared/interfaces/products/event-actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();
  public productsData!: Array<IAllProductsResponse>;

  constructor(
    private productsService: ProductsService,
    private productsDtService: ProductDataTransferService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getServiceProductData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getServiceProductData() {
    const productsLoaded = this.productsDtService.getProductsDatas();

    if (productsLoaded.length > 0) {
      this.productsData = productsLoaded;
    } else {
      this.getAPIProductsData();
    }
  }

  getAPIProductsData() {
    this.productsService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.productsData = response;
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error on searching products',
            life: 2500,
          });
          this.router.navigate(['/dashboard']);
        },
      });
  }

  handleProductAction(event: EventAction): void {
    if (event) {
      console.log('Receive event data', event);
    }
  }

  handleDeleteProductAction(event: {
    productId: string;
    productName: string;
  }): void {
    if (event) {
      this.confirmationService.confirm({
        message: `Are you sure you want to delete ${event.productName}?`,
        header: 'Delete Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Yes',
        rejectLabel: 'No',
        accept: () => this.deleteProduct(event.productId),
      });
    }
  }

  deleteProduct(productId: string) {
    if (productId) {
      this.productsService
        .deleteProduct(productId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Product was removed successfully!',
                life: 2500,
              });

              this.getAPIProductsData();
            }
          },
          error: (error) => {
            console.log(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'An error has occurred on removing product',
              life: 2500,
            });
          },
        });
    }
  }
}
