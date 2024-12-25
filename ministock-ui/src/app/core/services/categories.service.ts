import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { Observable, Observer, take } from 'rxjs';
import { AllCategoriesResponse } from '../../shared/interfaces/products/responses/all-categories.response';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private API_URL = environment.apiUrl;
  private JWT_TOKEN = this.cookie.get('USER_INFO');
  private HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    }),
  };

  constructor(private http: HttpClient, private cookie: CookieService) {}

  getAllCategories(): Observable<AllCategoriesResponse[]> {
    return this.http.get<AllCategoriesResponse[]>(`${this.API_URL}/category`, this.HTTP_OPTIONS);
  }

  createNewCategory(requestData: {name: string}): Observable<AllCategoriesResponse[]> {
    return this.http.post<Array<AllCategoriesResponse>>(
      `${this.API_URL}/category`,
      requestData,
      this.HTTP_OPTIONS
    ).pipe(take(1));
  }

  editCategory(requestData: {category_id: string, name: string}): Observable<void> {
    return this.http.put<void>(
      `${this.API_URL}/category`,
      {name: requestData?.name },
      {
        ...this.HTTP_OPTIONS,
        params: {
          category_id: requestData?.category_id
        }
      }
    );
  }
  deleteCategory(requestData: {category_id: string}): Observable<void> {
    return this.http.delete<void>(
      `${this.API_URL}/category`,
      {
        ...this.HTTP_OPTIONS, params: {
          category_id: requestData?.category_id
        }
      }
    ).pipe(take(1));
  }
}
