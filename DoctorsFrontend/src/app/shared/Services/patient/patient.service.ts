import { Injectable, NgZone, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr'
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  moment: any = moment;
  public subject = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    // public toster: ToastrService,
    public router: Router,
    public ngZone: NgZone
  ) {}

  rootURL = 'http://localhost:3003/v1';

  // setData(data: any) {
  //   this.subject.next(data)
  // }

  CreatePatient(data: any) {
    this.http
      .post(this.rootURL + '/patients', data)
      .subscribe((result: any) => {
        this.getPatients().subscribe((res) => {});
        this.getPatientsByDoctor(data.doctor).subscribe((res) => {
          this.subject.next(res);
        });
      });
  }
  getPatients() {
    return this.http.get(this.rootURL + '/patients');
  }
  getPatientsByDoctor(doctorId: any) {
    return this.http.get(this.rootURL + '/patients/doc/' + doctorId);
  }
  getPatientByUserId(data: any) {
    this.http
      .post(this.rootURL + '/patients/searchByUserId', data)
      .subscribe((res) => {
        localStorage.setItem('roleUser', JSON.stringify(res[0]));
      });
  }
  getPatientById(id: any) {
    return this.http.get(this.rootURL + '/patients/' + id);
  }

  getPatientsReport(q?: string) {
    let url = `${this.rootURL}/patients/report/age`;
    if (q) url += `?${q}`;
    return this.http.get(url);
  }

  getPatientsReportHeight(q?: string) {
    let url = `${this.rootURL}/patients/report/height`;
    if (q) url += `?${q}`;
    return this.http.get(url);
  }

  getPatientsReportWeight(q?: string) {
    let url = `${this.rootURL}/patients/report/weight`;
    if (q) url += `?${q}`;
    return this.http.get(url);
  }

  getPatientHealthReport(data) {
    return this.http.post(this.rootURL + '/patients/report/health', data);
  }
}
