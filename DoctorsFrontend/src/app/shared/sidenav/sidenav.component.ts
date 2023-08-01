import { Component, OnInit } from '@angular/core';
import { PatientService } from '../Services/patient/patient.service';
import * as moment from 'moment';
import { MedicalNoteService } from 'src/app/shared/Services/MedicalNote/medicalNote.service';
import { BloodPressureService } from 'src/app/shared/Services/BloodPressure/BloodPressure.service';
import { BloodSugarService } from 'src/app/shared/Services/BloodSugar/BloodSugar.service';
import { HeartRateService } from 'src/app/shared/Services/HeartRate/HeartRate.service';
import { SaturationService } from '../Services/saturation.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  moment: any = moment;
  patientsData: any = [];
  myPatients: any = [];

  bpData: any[] = [];
  bsData: any[] = [];
  hrData: any[] = [];
  notesData: any[] = [];
  saturationData: any;

  constructor(
    public patientService: PatientService,
    public medicalNoteService: MedicalNoteService,
    public bloodPressureService: BloodPressureService,
    public bloodSugarService: BloodSugarService,
    public heartRateService: HeartRateService,
    public saturationService: SaturationService
  ) {}
  ngOnInit(): void {
    this.getPatientsList();
    this.getPatientsByDoctor();

    this.getNotesList();
    this.getBpList();
    this.getBsList();
    this.getHrList();
    this.getSaturationList();
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

  getBpList() {
    let b = localStorage.getItem('roleUser');
    let patient = JSON.parse(b);
    if (patient) {
      this.bloodPressureService
        .getBloodPressuresByPatientId({ patientId: patient._id })
        .subscribe((res: any) => {
          this.bpData = res;
        });
    }
  }
  getBsList() {
    let b = localStorage.getItem('roleUser');
    let patient = JSON.parse(b);
    if (patient) {
      this.bloodSugarService
        .getBloodSugarsByPatientId({ patientId: patient._id })
        .subscribe((res: any) => {
          this.bsData = res.reverse();
        });
    }
  }
  getHrList() {
    let b = localStorage.getItem('roleUser');
    let patient = JSON.parse(b);
    if (patient) {
      this.heartRateService
        .getHeartRatesByPatientId({ patientId: patient._id })
        .subscribe((res: any) => {
          this.hrData = res;
        });
    }
  }
  getNotesList() {
    let b = localStorage.getItem('roleUser');
    let patient = JSON.parse(b);
    if (patient)
      this.medicalNoteService
        .getMedicalNotesByPatientId({ patientId: patient._id })
        .subscribe((res: any) => {
          this.notesData = res;
        });
  }

  getSaturationList() {
    let b = localStorage.getItem('roleUser');
    let patient = JSON.parse(b);
    if (patient)
      this.saturationService
        .getSaturationByPatientId(patient._id)
        .subscribe((res: any) => {
          this.saturationData = res;
        });
  }
}
