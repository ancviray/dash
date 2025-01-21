import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    ///const isRegistered = localStorage.getItem('isRegistered') === 'true';

    // Debug: Log current states
    console.log('isLoggedIn:', isLoggedIn);
    ///console.log('isRegistered:', isRegistered);

    // Check if the user is logged in
    ///if (isRegistered) {
      // If logged in, allow access
      ///return true;
    ///}

    // Check if the user is registered (only if not logged in)
    if (!isLoggedIn) {
      // Redirect to registration page if not registered
      this.router.navigate(['/login']);
      return false;
    }

    return true
  }
}