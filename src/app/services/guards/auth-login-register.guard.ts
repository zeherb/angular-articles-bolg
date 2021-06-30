import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthLoginRegisterGuard {
  constructor(private router: Router) {}
  canActivate() {
    if (!localStorage.getItem('connected')) {
      return true;
    } else {
      this.router.navigate(['home']);
      return false;
    }
  }
}
