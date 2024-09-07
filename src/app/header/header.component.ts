import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  constructor(private router: Router, private authService: AuthService) {
    if (sessionStorage.getItem('token')) this.isLoggedIn = true;
  }

  signOut() {
    this.authService.logout();
    this.isLoggedIn = false;
  }

  signIn() {
    this.router.navigate(['/factors']);
    this.isLoggedIn = true;
  }
}
