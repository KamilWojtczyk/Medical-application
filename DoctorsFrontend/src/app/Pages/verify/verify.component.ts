import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../shared/Services/login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
})
export class VerifyComponent implements OnInit {
  error: boolean = false;
  email: string = '';
  emailError: boolean = false;
  password: string = '';
  passError: boolean = false;
  verifyToken = '';
  constructor(
    private router: Router,
    public loginService: LoginService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.route.queryParams.subscribe((res) => {
      this.email = res['email'];
      this.verifyToken = res['token'];
    });
  }

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
  handlePassword(e) {
    this.password = e.target.value;
    if (this.password && this.password.length > 7) {
      this.passError = false;
    } else {
      this.passError = true;
    }
  }
  handleSubmit() {
    if (
      this.IsEmailVerified(this.email) &&
      this.password &&
      this.password.length > 7 &&
      this.passError === false &&
      this.emailError === false
    ) {
      let data = {
        email: this.email,
        password: this.password,
        verifyToken: this.verifyToken,
      };
      this.loginService.verifyAccount(data).subscribe(
        (res) => {
          this._snackBar.open('Your account has been verified', 'Close', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          this.router.navigate(['/login']);
        },
        (err) => {
          this._snackBar.open(err.error.message, 'Close', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }
      );
    } else {
      alert('Invalid inputs!');
    }
  }
}
