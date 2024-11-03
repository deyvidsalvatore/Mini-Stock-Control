import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAllProductsResponse } from '../../shared/interfaces/products/responses/all-products.response';
import { ProductsService } from '../../core/services/products.service';
import { MessageService } from 'primeng/api';
import { ProductDataTransferService } from '../../shared/services/products-data-transfer.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  public productList: IAllProductsResponse[] = [];

  private destroy$ = new Subject<void>;

  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private productsDTService: ProductDataTransferService
  ) {}

  ngOnInit(): void {
    this.getProductsDatas();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getProductsDatas(): void {
    this.productsService
      .getAllProducts()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.productList = response;
            this.productsDTService.setProductsDatas(this.productList);
          }
        }, error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Could not search the products',
            life: 2000
          })
        }
      });
  }

}
