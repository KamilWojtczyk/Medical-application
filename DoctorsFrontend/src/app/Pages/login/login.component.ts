import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/Services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error: boolean = false;
  email: string = '';
  emailError: boolean = false;
  password: string = '';
  passError: boolean = false;
  constructor(private router: Router, public loginService: LoginService) {}

  ngOnInit(): void {}
  goToResetPassword() {
    this.router.navigateByUrl('/authentication/reset-password');
  }
  IsEmailVerified(email: string) {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email || regex.test(email) === false) {
      return false;
    }
    return true;
  }
  handleEmail(val: string) {
    if (this.IsEmailVerified(val)) {
      this.emailError = false;
      this.email = val;
    } else {
      this.emailError = true;
    }
  }
  handlePassword(val: string) {
    if (val && val.length > 7) {
      this.passError = false;
      this.password = val;
    } else {
      this.passError = true;
    }
  }
  handleLogin() {
    if (
      this.IsEmailVerified(this.email) &&
      this.password &&
      this.password.length > 7 &&
      this.passError === false &&
      this.emailError === false
    ) {
      let data = { email: this.email, password: this.password };
      this.loginService.login(data);
    } else {
      alert('Invalid inputs!');
    }
  }
}
