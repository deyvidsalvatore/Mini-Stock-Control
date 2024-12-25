import { Injectable } from "@angular/core";
import { BehaviorSubject, map, take } from "rxjs";
import { IAllProductsResponse } from "../interfaces/products/responses/all-products.response";

@Injectable({
  providedIn: 'root'
})
export class ProductDataTransferService {
  public productDataEmitter$ = new BehaviorSubject<IAllProductsResponse[] | null>(null);
  public productDatas: Array<IAllProductsResponse> = [];

  setProductsDatas(products: IAllProductsResponse[]): void {
    if (products) {
      this.productDataEmitter$.next(products);
      this.getProductsDatas();
    }
  }

  getProductsDatas() {
    this.productDataEmitter$
      .pipe(
        take(1),
        map((data) => data?.filter((product) => product.amount > 0))
    )
    .subscribe({
      next: (response) => {
        if (response) {
          this.productDatas = response;
        }
      }
    });
    return this.productDatas;
  }
}
