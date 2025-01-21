import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import HttpClient for making HTTP requests
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email!: string;
  otpSent: boolean = false;  // Flag to show OTP sent status
  errorMessage: string | null = null;  // To display errors if any
  successMessage: string | null = null;  // For showing success message

  constructor(private http: HttpClient, private router: Router) {}  // Inject HttpClient

  // Validate the email format
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Send OTP logic
  sendOtp() {
    if (!this.validateEmail(this.email)) {
      this.errorMessage = 'Please enter a valid DLSAU email address.';
      this.successMessage = null;
      return;
    }

    this.http.post('http://localhost:3000/add-otp', { email: this.email }).subscribe(
      (response: any) => {
        this.otpSent = true;
        this.successMessage = 'OTP has been sent successfully to your email!';
        this.errorMessage = null;

        // Store the email and navigate to OTP verification
        localStorage.setItem('email', this.email);
        this.router.navigate(['/verify-otp']);
      },
      (error) => {
        console.error('Error sending OTP:', error);
        this.successMessage = null;
        this.errorMessage = 'Failed to send OTP. Please try again.';
      }
    );
  }


  // Form submission handler
  onSubmit() {
    // Clear messages before submitting
    this.errorMessage = null;
    this.successMessage = null;

    // Trigger OTP sending
    this.sendOtp();
  }
}