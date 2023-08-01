import { Injectable, NgZone, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr'
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as moment from 'moment';
import { DoctorService } from '../doctor/doctor.service';
import { PatientService } from '../patient/patient.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { concatMap, switchMap } from 'rxjs/operators';
import { ChartService } from '../chart.service';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  moment: any = moment;
  public showLoader: boolean = false;
  public userDataDetails: any;
  public subject = new BehaviorSubject(null);
  userData: any = {};
  constructor(
    public doctorService: DoctorService,
    public patientService: PatientService,
    private http: HttpClient,
    // public toster: ToastrService,
    private _snackBar: MatSnackBar,
    public router: Router,
    public ngZone: NgZone,
    private chartService: ChartService
  ) {}

  // rootURL = 'http://143.198.98.192:3000/v1'
  rootURL = 'http://localhost:3003/v1';

  login(data: any) {
    this.chartService.purgeCharts();
    this.http.post(this.rootURL + '/auth/login', data).subscribe({
      next: (result: any) => {
        this.userData = result;
        let d = JSON.stringify(result.user);
        localStorage.setItem('userDataDetails', d);
        localStorage.setItem('userToken', result.tokens.access.token);
        localStorage.setItem('user', d);
        this.subject.next(result.user);
        let time = moment(result.tokens.access.expires);
        let nowTime = moment(Date.now()).format();
        let minutes = time.diff(nowTime, 'minutes');
        this.router.navigate(['/dashboard']);
        this.runLogoutTimer(minutes);
        if (result.user.role === 'doctor') {
          this.doctorService.getDoctorByUSerId({ userId: result.user._id });
        } else if (result.user.role === 'patient') {
          this.patientService.getPatientByUserId({ userId: result.user._id });
        }
      },
      error: (err: any) => {
        console.log('GGGGGGGG', err);
        this._snackBar.open(err.error.message, 'Close', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      },
    });
  }

  setData(data: any) {
    this.subject.next(data);
  }

  CreateUser(data, docData) {
    this.http.post(this.rootURL + '/users', data).subscribe((result: any) => {
      let d = { ...docData, userId: result._id };
      if (data.role === 'doctor') {
        this.doctorService.CreateDoctor(d);
      } else {
        this.patientService.CreatePatient(d);
      }
    });
  }
  createDoctor(data, docData) {
    return this.http.post(this.rootURL + '/users', data).pipe(
      switchMap((result: any) => {
        const d = { ...docData, userId: result._id };
        return this.http.post(this.rootURL + '/doctors', d);
      })
    );
  }
  createPatient(data, docData): Observable<any> {
    return this.http.post(this.rootURL + '/users', data).pipe(
      switchMap((result: any) => {
        const d = { ...docData, userId: result._id };
        return this.http.post(this.rootURL + '/patients', d);
      })
    );
  }
  // createDoctor(data: any): Observable<any> {
  //   return this.http.post(this.rootURL + '/users', data).pipe(map((result) => {

  //     this.patientService.CreatePatient
  //   }));
  // }
  // createPatient(data: any): Observable<any> {
  //   return this.http.post(this.rootURL + '/patients', data);
  // }

  verifyAccount(payload: any) {
    let url = `${this.rootURL}/auth/verify-email`;
    return this.http.post(url, payload);
  }

  runLogoutTimer(timer: any) {
    setTimeout(() => {
      this.SignOut();
    }, timer * 60 * 1000);
  }
  SignOut() {
    localStorage.removeItem('userDataDetails');
    localStorage.removeItem('userToken');
    this.subject.next(null);
    this.router.navigate(['/login']);
    this.chartService.purgeCharts();
  }
  updateUser(data: any, id: any) {
    return this.http.patch(this.rootURL + '/users/' + id, data);
  }
}
