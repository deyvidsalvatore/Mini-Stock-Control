import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
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

  deleteCategory(requestData: {category_id: string}): Observable<void> {
    return this.http.delete<void>(
      `${this.API_URL}/category`,
      {
        ...this.HTTP_OPTIONS, params: {
          category_id: requestData?.category_id
        }
      }

    )
  }
}
