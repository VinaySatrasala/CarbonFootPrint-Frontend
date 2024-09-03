import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})




export class HeaderComponent {
  isLoggedIn = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Assume you have some logic to determine if the user is logged in or not
    this.isLoggedIn = !!localStorage.getItem('token'); // Example logic
  }

  logout(): void {
    // Perform logout operation
    localStorage.removeItem('token'); // Example logic
    this.isLoggedIn = false;
    this.router.navigate(['/signin']);
  }
  signOut(){
    
  }
}
