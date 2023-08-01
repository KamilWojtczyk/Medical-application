import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../Services/login/login.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAndDoctorGuard implements CanActivate {
  abc: any = false;
  constructor(public loginService: LoginService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let userData: any = localStorage.getItem('userDataDetails');
    userData = JSON.parse(userData);
    if (userData.role === 'admin' || userData.role === 'doctor') {
      return true;
    }
    this.router.navigateByUrl('/login');
    return true;
  }
}
