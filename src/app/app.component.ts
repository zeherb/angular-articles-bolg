import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router) {}
  title = 'miniProjectBlog';
  ifConnected: boolean = !localStorage.getItem('connected');
  connectedUser = JSON.parse(localStorage.getItem('connected')!) || null;
  logout() {
    localStorage.removeItem('connected');
    this.router.navigate(['login']);
    window.location.reload();
  }
}
