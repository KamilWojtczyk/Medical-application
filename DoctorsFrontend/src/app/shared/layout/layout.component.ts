import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  user: any = {};
  constructor(public loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    let a = localStorage.getItem('userDataDetails');
    this.user = JSON.parse(a);

    if (this.user && this.router.url == '/') {
      switch (this.user.role) {
        case 'patient':
          this.router.navigate(['/medical-data']);
          break;
        case 'doctor':
          this.router.navigate(['/patients']);
          break;
        case 'admin':
          this.router.navigate(['/doctors']);
          break;
      }
    }
  }
  sideBarOpen = true;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
