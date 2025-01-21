import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // This service is provided at the root level
})
export class DataService {
  private apiUrl = 'http://localhost:3000'; // Define the base URL for your backend API

  constructor(private http: HttpClient) {} // Inject HttpClient to make HTTP requests

  // Login method
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }
}
