import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: any = {}
  constructor() {
    let a = localStorage.getItem('userDataDetails')
    this.user = JSON.parse(a)
  }

  ngOnInit(): void {}
}