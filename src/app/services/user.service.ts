import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users'; // Adjust the API URL to your server

  constructor(private http: HttpClient) { }

  // Get all users from the database
  getUsers(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/users/get');
  }

  // Get user types
  getUserTypes(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/users/user-types');
  }

  // Add a new user to the backend
  addUser(user: any): Observable<any> {
    const apiUrl = 'http://localhost:3000/api/users/add'; // Make sure this is correct
    return this.http.post(apiUrl, user);
  }

  // Edit a user by email
  updateUser(user: any): Observable<any> {
    const url = `http://localhost:3000/api/users/update`;
    return this.http.put(url, user);
  }

  // Delete a user by email
  deleteUser(userEmail: string): Observable<any> {
    const url = `http://localhost:3000/api/users/delete/${userEmail}`;
    return this.http.delete<any>(url);
  }
}


