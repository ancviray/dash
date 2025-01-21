import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  standalone: false,
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent {
  otp: string[] = ['', '', '', '', '', ''];  // OTP input array
  resendDisabled = false;
  countdown = 120;
  email: string; // Retrieve email from localStorage
  errorMessage: string = ''; // For storing error messages

  constructor(private router: Router, private http: HttpClient) {
    // Retrieve the email from localStorage
    this.email = localStorage.getItem('email') || '';
  }

  // Form submission to verify OTP
  onSubmit() {
    const otpCode = this.otp.join('');
    console.log('OTP Code:', otpCode);  // Log OTP to check what value is sent

    if (otpCode.length === 6) {
      this.verifyOTP(otpCode);  // Call verifyOTP here
    } else {
      this.errorMessage = 'Please enter a valid OTP.';
    }
  }

  // Function to verify OTP
  verifyOTP(otpCode: string) {
    const body = { email: this.email, otp: otpCode };
    this.http.post('http://localhost:3000/verify-otp', body)
      .subscribe(
        (response: any) => {
          console.log('OTP verified:', response);
          this.router.navigate(['/setup-password']);  // Redirect to dashboard after success
        },
        (error) => {
          console.error('Error verifying OTP:', error);
          this.errorMessage = 'Invalid OTP or email.';
        }
      );
  }

  // Resend OTP functionality
  resendOTP() {
    // Disable resend button temporarily
    this.resendDisabled = true;
    this.countdown = 120; // Countdown timer for resend button
    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(interval);
        this.resendDisabled = false;
      }
    }, 1000);

    // Call sendOtp() to resend OTP
    this.http.post('http://localhost:3000/add-otp', { email: this.email }).subscribe(
      (response: any) => {
        console.log('OTP resent successfully:', response);
        this.errorMessage = ''; // Clear any previous error messages
      },
      (error) => {
        console.error('Error resending OTP:', error);
        this.errorMessage = 'Failed to resend OTP. Please try again.';
      }
    );
  }


  // Check if OTP is incomplete
  isOtpInvalid() {
    return this.otp.some(digit => digit === '');
  }
}
