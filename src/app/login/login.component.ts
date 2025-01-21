import { Component } from '@angular/core';
import { DataService } from '../services/data.service';  // Import the DataService
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  passwordVisible: boolean = false;
  loginError: string | null = null;  // Variable to store any login error

  constructor(private dataService: DataService, private router: Router) {}  // Inject DataService


  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    //const passwordField = document.getElementById('password') as HTMLInputElement;
    //passwordField.type = this.passwordVisible ? 'text' : 'password';
  }

  onSubmit() {
    if (this.email && this.password) {
      this.dataService.login(this.email, this.password).subscribe(
        (response) => {
          console.log('Login Successful:', response);

          // Extract user details from response
          const { firstname, lastname, user_type} = response.user;


          // Save user information to localStorage
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('firstname', firstname);
          localStorage.setItem('lastname', lastname);
          localStorage.setItem('user_type', user_type.toString());

          // Debug: Check what is saved in localStorage
          console.log('Saved user_type:', localStorage.getItem('user_type'));

           //Redirect or store the response (like token) here
          this.router.navigate(['/dashboard']);  // Redirect on success
        },
        (error) => {
          console.error('Login Failed:', error);
          this.loginError = 'Invalid email or password';  // Show error message
        }
      );
    } else {
      this.loginError = 'Please enter both email and password';  // Show error message if fields are empty


    }
  }
}