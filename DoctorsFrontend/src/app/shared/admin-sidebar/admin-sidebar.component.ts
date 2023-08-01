import { Component, OnInit } from '@angular/core';
import { PatientService } from '../Services/patient/patient.service';
import * as moment from 'moment';
import { User } from '../models/user';
import { DoctorService } from '../Services/doctor/doctor.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss'],
})
export class AdminSidebarComponent implements OnInit {
  patientsData: any[] = [];
  doctorsData: any[] = [];
  user: any;
  constructor(
    public patientService: PatientService,
    public doctorService: DoctorService
  ) {}
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userDataDetails'));
    console.log({ user: this.user });
    // this.doctorService.subject.subscribe((data: any) => {
    //   this.doctorsData = data
    // })
    this.getPatientsList();
    this.getDoctorsList();
  }
  getPatientsList() {
    this.patientService.getPatients().subscribe((res: any) => {
      this.patientsData = res;
    });
  }
  getDoctorsList() {
    this.doctorService.getDoctors().subscribe((res: any) => {
      this.doctorsData = res;
    });
  }
}
