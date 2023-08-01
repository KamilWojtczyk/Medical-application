import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { LoginService } from '../shared/Services/login/login.service';
import { MedicalNoteService } from '../shared/Services/MedicalNote/medicalNote.service';
import { PatientService } from '../shared/Services/patient/patient.service';
@Component({
  selector: 'app-medical-data',
  templateUrl: './medical-data.component.html',
  styleUrls: ['./medical-data.component.scss'],
})
export class MedicalDataComponent implements OnInit {
  buttonsList: string[] = [
    'Personal Information',
    'Blood Pressure',
    'Blood Sugar',
    'Heart Rate',
    'Saturation',
    'Medical Note',
  ];
  btnTab: string = 'Personal Information';
  moment: any = moment;
  user: any = {};
  roleUser: any = {};
  notesData: any[] = [];
  constructor(
    public patientService: PatientService,
    public loginService: LoginService,
    public medicalNoteService: MedicalNoteService
  ) {
    let a = localStorage.getItem('userDataDetails');
    this.user = JSON.parse(a);
  }
  ngOnInit(): void {
    this.medicalNoteService.subject.subscribe((data: any[]) => {
      if (data) {
        this.notesData = data.reverse();
      }
    });
    this.getNotesList();
    let b = localStorage.getItem('roleUser');
    this.roleUser = JSON.parse(b);
  }
  getNotesList() {
    let b = localStorage.getItem('roleUser');
    let patient = JSON.parse(b);
    this.medicalNoteService
      .getMedicalNotesByPatientId({ patientId: patient._id })
      .subscribe((res: any[]) => {
        this.notesData = res.reverse();
      });
  }
}
