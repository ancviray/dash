import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HealthConditionsService {
  private apiUrl = 'http://localhost:3000/health-conditions';

  constructor(private http: HttpClient) {}

  // Get
  getCategories(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/health-conditions/get');
  }

  // Add
  addCategory(category: any): Observable<any> {
    const url = 'http://localhost:3000/health-conditions/add'; // Make sure this is correct
    return this.http.post(url, category);
  }

  // Edit
  updateCategory(category: any): Observable<any> {
    const url = `http://localhost:3000/health-conditions/update`;
    return this.http.put(url, category);
  }

  // Delete
  deleteCategory(id: string): Observable<any> {
    const url = `http://localhost:3000/health-conditions/delete/${id}`;
    return this.http.delete<any>(url);
  }
}