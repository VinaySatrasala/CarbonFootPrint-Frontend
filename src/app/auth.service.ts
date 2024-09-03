import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  loginSuccessHandler({
    token,
    userID,
  }: {
    token: string;
    userID: string;
  }): void {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userID', userID);
    this.router.navigate(['/factors']);
  }

  isLoggedIn(): boolean {
    const token = sessionStorage.getItem('token');
    const userID = sessionStorage.getItem('userID');
    return token != null && userID != null;
  }
}
