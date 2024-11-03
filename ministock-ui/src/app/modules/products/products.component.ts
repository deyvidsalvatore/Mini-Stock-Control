import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from '../../core/services/products.service';
import { ProductDataTransferService } from '../../shared/services/products-data-transfer.service';
import { Router } from '@angular/router';
import { IAllProductsResponse } from '../../shared/interfaces/products/responses/all-products.response';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {

  private readonly destroy$: Subject<void> = new Subject<void>;
  public productsData!: Array<IAllProductsResponse>;

  constructor(
    private productsService: ProductsService,
    private productsDtService: ProductDataTransferService,
    private router: Router,
    private messageService: MessageService
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
    this.productsService.getAllProducts()
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
          life: 2500
        });
        this.router.navigate(['/dashboard']);
      }
    },
  );
  }

}