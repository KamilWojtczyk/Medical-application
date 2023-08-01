import { Component, OnInit } from '@angular/core';
import { PatientService } from '../Services/patient/patient.service';
import * as moment from 'moment';

@Component({
  selector: 'app-doctors-sidebar',
  templateUrl: './doctors-sidebar.component.html',
  styleUrls: ['./doctors-sidebar.component.scss'],
})
export class DoctorsSidebarComponent implements OnInit {
  moment: any = moment;
  patientsData: any = [];
  myPatients: any = [];
  constructor(public patientService: PatientService) {}
  ngOnInit(): void {
    this.getPatientsList();
    this.getPatientsByDoctor();
  }
  getPatientsList() {
    this.patientService.getPatients().subscribe((res: any) => {
      this.patientsData = res;
    });
  }
  getPatientsByDoctor() {
    let b = localStorage.getItem('roleUser');
    let doctor = JSON.parse(b);
    if (doctor)
      this.patientService
        .getPatientsByDoctor(doctor._id)
        .subscribe((res: any) => {
          this.myPatients = res;
        });
  }
}
