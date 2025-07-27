// src/app/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { UsersService } from '../app/services/users.service'; // Adjust path as needed

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UsersService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.userService.isLoggedIn()) {
      return true;
    } else {
      return this.router.parseUrl('/login'); // Redirect to login
    }
  }
}
