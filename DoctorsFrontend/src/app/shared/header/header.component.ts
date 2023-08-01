import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  user: any = {};
  constructor(private router: Router, public loginService: LoginService) {}

  ngOnInit(): void {
    let a = localStorage.getItem('userDataDetails');
    this.user = JSON.parse(a);
  }

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
  handleSignOut() {
    this.loginService.SignOut();
  }
}
