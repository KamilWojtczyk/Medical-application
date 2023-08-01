import { Injectable, NgZone, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr'
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class BloodPressureService {
  moment: any = moment;
  public subject = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    // public toster: ToastrService,
    public router: Router,
    public ngZone: NgZone
  ) {}

  rootURL = 'http://localhost:3003/v1';

  CreateBloodPressure(data: any) {
    this.http
      .post(this.rootURL + '/blood-pressure', data)
      .subscribe((result: any) => {
        this.getBloodPressuresByPatientId({
          patientId: data.patient,
        }).subscribe((res) => {
          this.subject.next(res);
        });
      });
  }
  getBloodPressuresByPatientId(data: any) {
    return this.http.post(
      this.rootURL + '/blood-pressure/searchByPatientId',
      data
    );
  }
}
