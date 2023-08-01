import { Injectable, NgZone, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr'
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  moment: any = moment;
  public subject = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    // public toster: ToastrService,
    public router: Router,
    public ngZone: NgZone
  ) {}

  rootURL = 'http://localhost:3003/v1';

  CreateDoctor(data: any) {
    this.http.post(this.rootURL + '/doctors', data).subscribe((result: any) => {
      this.getDoctors().subscribe((res) => {
        this.subject.next(res);
      });
    });
  }
  getDoctors() {
    return this.http.get(this.rootURL + '/doctors');
  }
  getDoctorByUSerId(data: any) {
    this.http
      .post(this.rootURL + '/doctors/searchByUserId', data)
      .subscribe((res) => {
        localStorage.setItem('roleUser', JSON.stringify(res[0]));
      });
  }
}
