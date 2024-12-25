import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, take, throwError } from 'rxjs';
import { IAllProductsResponse } from '../../shared/interfaces/products/responses/all-products.response';
import { DeleteProductResponse } from '../../shared/interfaces/products/responses/delete-product.response';
import { CreateProductRequest } from '../../shared/interfaces/products/requests/create-product.request';
import { CreateProductResponse } from '../../shared/interfaces/products/responses/create-product.response';
import { EditProductRequest } from '../../shared/interfaces/products/requests/edit-product.request';
import { SaleProductRequest } from '../../shared/interfaces/products/requests/sale-product.request';
import { SaleProductResponse } from '../../shared/interfaces/products/responses/sale-product.response';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private API_URL = environment.apiUrl;
  private JWT_TOKEN = this.cookie.get('USER_INFO');
  private HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient, private cookie: CookieService) {}

  getAllProducts(): Observable<IAllProductsResponse[]> {
    return this.http
      .get<IAllProductsResponse[]>(`${this.API_URL}/product`, this.HTTP_OPTIONS)
      .pipe(
        map((products) => products.filter((data) => data.amount > 0)),
        take(1),
        catchError(this.handleError)
      );
  }

  createProduct(
    createProductRequest: CreateProductRequest
  ): Observable<CreateProductResponse> {
    return this.http
      .post<CreateProductResponse>(
        `${this.API_URL}/product`,
        createProductRequest,
        this.HTTP_OPTIONS
      )
      .pipe(take(1), catchError(this.handleError));
  }

  editProduct(editProduct: EditProductRequest): Observable<void> {
    return this.http
      .put<void>(`${this.API_URL}/product`, editProduct, this.HTTP_OPTIONS)
      .pipe(take(1), catchError(this.handleError));
  }
  deleteProduct(productId: string): Observable<DeleteProductResponse> {
    return this.http
      .delete<DeleteProductResponse>(`${this.API_URL}/product`, {
        ...this.HTTP_OPTIONS,
        params: {
          product_id: productId,
        },
      })
      .pipe(take(1), catchError(this.handleError));
  }

  saleProduct(
    requestDatas: SaleProductRequest
  ): Observable<SaleProductResponse> {
    return this.http
      .post<SaleProductResponse>(
        `${this.API_URL}/product/sale`,
        {
          amount: requestDatas?.amount,
          product_id: requestDatas?.product_id,
        },
        {
          ...this.HTTP_OPTIONS
        }
      )
      .pipe(take(1), catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code: ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }
}
