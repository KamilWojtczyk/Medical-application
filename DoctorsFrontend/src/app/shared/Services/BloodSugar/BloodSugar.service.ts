import { Injectable, NgZone, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr'
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class BloodSugarService {
  moment: any = moment;
  public subject = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    // public toster: ToastrService,
    public router: Router,
    public ngZone: NgZone
  ) {}

  rootURL = 'http://localhost:3003/v1';

  CreateBloodSugar(data: any) {
    this.http
      .post(this.rootURL + '/blood-sugar', data)
      .subscribe((result: any) => {
        this.getBloodSugarsByPatientId({ patientId: data.patient }).subscribe(
          (res) => {
            this.subject.next(res);
          }
        );
      });
  }
  getBloodSugarsByPatientId(data: any) {
    return this.http.post(
      this.rootURL + '/blood-sugar/searchByPatientId',
      data
    );
  }

  getAPGByPatientIdAndDate(data: any) {
    return this.http.post(
      this.rootURL + '/blood-sugar/getAPGByPatientIdAndDate',
      data
    );
  }
}
