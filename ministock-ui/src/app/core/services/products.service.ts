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

  deleteProduct(productId: string): Observable<DeleteProductResponse> {
    return this.http
      .delete<DeleteProductResponse>(`${this.API_URL}/product`, {
        ...this.HTTP_OPTIONS,
        params: {
          product_id: productId,
        },
      })
      .pipe(catchError(this.handleError));
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
