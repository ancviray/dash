import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-setup-password',
  standalone: false,
  templateUrl: './setup-password.component.html',
  styleUrls: ['./setup-password.component.css']
})
export class SetupPasswordComponent {

  password: string = '';
  confirmPassword: string = '';
  passwordMismatch: boolean = false;
  email: string | null = localStorage.getItem('email'); // Retrieve email from localStorage
  errorMessage: string = '';  // Variable to store error message

  // Constructor for HTTP, Router
  constructor(private http: HttpClient, private router: Router) {}

  // Method to handle form submission
  onSubmit() {
    // Check if the passwords match
    if (this.password !== this.confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    // Prepare the data to send to the backend
    const data = {
      email: this.email,
      password: this.password
    };

    // Send the data to your backend API
    this.http.post('http://localhost:3000/setup-password', data).subscribe(
      response => {
        // Handle successful response (e.g., navigate to the dashboard)
        console.log('Password setup successful', response);
        this.router.navigate(['/login']); // Navigate to the dashboard
      },
      error => {
        // Handle error and show password validation message
        if (error.status === 400 && error.error.message) {
          this.errorMessage = error.error.message; // Set the error message
        } else {
          console.error('Error setting up password', error);
        }
      }
    );
  }
}
