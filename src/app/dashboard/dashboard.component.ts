import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  user: string = '';  // To hold the user's name
  userType: number = 0;  // Default value, replace with dynamic value

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Fetch user details from localStorage
    this.user = localStorage.getItem('firstname')?.trim() || 'Guest';  // Default value if blank, null, or empty string
    this.userType = Number(localStorage.getItem('user_type')) || 0;
  }

  // Function for level 0 access -- all users
  level0access(): boolean {
    return [0, 1, 2, 3].includes(this.userType);  // Only show if user_type is 0, 1, 2, or 3
  }

  // Function for level 1 access -- admin only
  level1access(): boolean {
    return [1].includes(this.userType);  // Only show if user_type is 0, 1, 2, or 3
  }

// Sign Out function
signOut() {
  const confirmation = window.confirm("Are you sure you want to logout?");
  if (confirmation) {
    // Clear all data from localStorage
    localStorage.clear();

    // Optionally, clear sessionStorage if you're using it
    sessionStorage.clear();

    // Navigate to the login page
    this.router.navigate(['/login']);
  }
}
}