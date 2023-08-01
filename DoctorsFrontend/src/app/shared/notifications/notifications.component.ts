import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface INotification {
  _id: string;
  created_at: string;
  doctor: string;
  patient: string;
  title: string;
  subTitle: string;
  route: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  readAt?: any;
}
export interface INotificationResponse {
  "unread": number
  "page": number
  "totalPages": number
  "totalRecords": number
  "pageSize": number
  "data": INotification[]
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  @ViewChild('bellButton', {static: true}) bellButton: any;
  notificationData: INotificationResponse;
  user;
  constructor(
    private notificationSvc: NotificationService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    let a = localStorage.getItem('userDataDetails');
    this.user = JSON.parse(a);
    this.getNotifications();
  }

  getNotifications() {
    this.notificationSvc.getAllNotifications().subscribe((res: any) => {
      console.log(res, "getNotifications")
      this.notificationData = res;
    })

  }

  onNotificationClick(notification: INotification, i) {
    this.notificationSvc.markNotificationRead(notification._id).subscribe(res => {
      notification.readAt = new Date();
      if (this.notificationData.unread) {
        this.notificationData.unread--;
      }
    })
    this.router.navigate([notification.route])
  }

  ngOnInit() {
    this.notificationSvc.onMessage.subscribe((data: INotification) => {
      console.log("init", data)
      if(data && data.user == this.user._id) {
        this.notificationData.data.unshift(data);
        this.notificationData.unread ++;
        
        this.snackbar.open("You have new notification", data.subTitle, {
          horizontalPosition: 'end',
          verticalPosition: 'top'
        })
      }
    })
  }


  popoverPlacement: string;

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any) {
    this.popoverPlacement = this.getPopoverPlacement();
  }

  getPopoverPlacement(): string {
    const screenWidth = window.innerWidth;
    return screenWidth < 768 ? 'bottom' : 'bottom-right';
  }

}
