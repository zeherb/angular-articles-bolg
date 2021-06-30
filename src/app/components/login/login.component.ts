import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  notFoundEmail: boolean = false;
  wrongPassword: boolean = false;
  usersList: user[];
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
    });
    this.userService.getUsers().subscribe(
      (res) => {
        this.usersList = res;
      },
      (err) => {},
      () => {}
    );
  }
  login() {
    var foundUser = this.usersList.find(
      (element) =>
        element.email.toLocaleLowerCase() ==
        this.loginForm.controls['email'].value.toLocaleLowerCase()
    );
    if (!foundUser) {
      this.notFoundEmail = true;
      this.wrongPassword = false;
    } else {
      if (foundUser.password !== this.loginForm.controls['password'].value) {
        this.notFoundEmail = false;
        this.wrongPassword = true;
      } else {
        this.notFoundEmail = false;
        this.wrongPassword = false;
        localStorage.setItem('connected', JSON.stringify(foundUser));
        this.loginForm.reset();
        this.router.navigate(['home']);
        window.location.reload();
      }
    }
  }
}
