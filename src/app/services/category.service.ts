import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";

import { environment } from "src/environments/environment.prod";

const BACKEND_URL = environment.backendUrl + "/categories/";

@Injectable({
  providedIn: "root",
})
export class CategoryService {

  private catsUpdated = new Subject<{ categories: any[]; maxCats: number }>();
  private cats: any[] = [];

  constructor(private http: HttpClient) {}

  newCategory(name: string, description: string) {
    const categoryData = {name, description};
    return this.http.post<{response: any}>(BACKEND_URL + 'new-cat', categoryData);
  }

  getAllCategories() {
    return this.http.get<{response: any}>(BACKEND_URL + 'get-all');
  }
  
  getAdminCategories(currentPage, catsPerPage) {
    this.http.get<{ response: any }>(
      `${BACKEND_URL}admin-categories?page=${currentPage}&pageSize=${catsPerPage}`
    ).pipe(map(catData => {
      return {
        categories: catData.response.categories.map(cat => {
          return {
            name: cat.name,
            description: cat.description,
            _id: cat._id,
            userId: cat.userId
          }
        }),
        maxCats: catData.response.maxCats
      }
    })).subscribe(transformedCats => {
      this.cats = transformedCats.categories;
      this.catsUpdated.next({
        categories: [...this.cats],
        maxCats: transformedCats.maxCats
      })
    })
  }

  getAdminCategoriesUpdateListener() {
    return this.catsUpdated.asObservable();
  }

  findOneCategory(id: string) {
    return this.http.get<{response: any}>(BACKEND_URL + id);
  }

  updateCategory(id: string, name: string, description: string) {
    const categoryData = {name, description};
    return this.http.put<{response: any}>(BACKEND_URL + id, categoryData);
  }

  deleteCategory(id: string) {
    return this.http.delete<{response: any}>(BACKEND_URL + id);
  }


  getTopicsByCategory() {
    return this.http.get<{response: any}>(BACKEND_URL + 'join')
  }

}
