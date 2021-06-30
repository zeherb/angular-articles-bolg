import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { user } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  usersList: user[];
  constructor(private router: Router, private userService: UserService) {}
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      gendre: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
    this.userService.getUsers().subscribe(
      (res) => {
        this.usersList = res;
      },
      (err) => {},
      () => {
        console.log(this.usersList);
      }
    );
  }
  register() {
    if (this.registerForm.status == 'VALID') {
      const newUser: user = {
        id: this.usersList.length + 1,
        firstName: this.registerForm.controls.firstName.value,
        lastName: this.registerForm.controls.lastName.value,
        gendre: this.registerForm.controls.gendre.value,
        email: this.registerForm.controls.email.value,
        password: this.registerForm.controls.password.value,
      };
      this.userService.addUser(newUser).subscribe(
        (res) => {},
        (err) => {},
        () => {
          this.router.navigate(['login']);
        }
      );
    }
  }
}
