import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { LoginService } from '../shared/Services/login/login.service';
import { PatientService } from '../shared/Services/patient/patient.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {
  patientsData: any[] = [];
  user: any = {};
  moment: any = moment;
  roleUser: any = {};
  doctorsData: any[] = [];
  name: string = '';
  nameError: boolean = false;
  error: boolean = false;
  email: string = '';
  emailError: boolean = false;
  password: string = '';
  passError: boolean = false;
  ph: string = '';
  phError: boolean = false;
  gender: string = 'Male';
  genderError: boolean = false;
  age: string = '';
  ageError: boolean = false;
  height: string = '';
  heightError: boolean = false;
  weight: string = '';
  weightError: boolean = false;
  closeResult: string;
  modalOptions: NgbModalOptions;
  peselNo: any;
  peselNoError: boolean = false;
  patientForm: FormGroup;
  maxDate: Date = new Date();
  constructor(
    private router: Router,
    public patientService: PatientService,
    public loginService: LoginService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private snack: MatSnackBar
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'lg',
      scrollable: true,
      centered: true,
    };
    let a = localStorage.getItem('userDataDetails');
    this.user = JSON.parse(a);
  }

  ngOnInit(): void {
    this.createForm();
    if (this.user.role === 'doctor') {
      this.patientService.subject.subscribe((data: any[]) => {
        if (data) {
          this.patientsData = data.reverse();
        }
      });
    }
    this.getPatientsList();
    let b = localStorage.getItem('roleUser');
    this.roleUser = JSON.parse(b);
  }

  createForm() {
    this.patientForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      age: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['Male', Validators.required],
      peselNo: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      DOB: ['', Validators.required],
    });
  }
  getPatientsList() {
    let b = localStorage.getItem('roleUser');
    let doctor = JSON.parse(b);
    if (this.user.role === 'doctor') {
      this.patientService
        .getPatientsByDoctor(doctor._id)
        .subscribe((res: any) => {
          this.patientsData = res.reverse();
        });
    } else if (this.user.role === 'admin') {
      this.patientService.getPatients().subscribe((res: any[]) => {
        this.patientsData = res.reverse();
      });
    }
  }
  openModal(content) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }
  IsEmailVerified(email: string) {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email || regex.test(email) === false) {
      return false;
    }
    return true;
  }
  handleName(val: string) {
    if (val) {
      this.nameError = false;
      this.name = val;
    } else {
      this.nameError = true;
    }
  }
  handleAge(val: string) {
    if (val) {
      this.ageError = false;
      this.age = val;
    } else {
      this.ageError = true;
    }
  }
  handleHeight(val: string) {
    if (val) {
      this.heightError = false;
      this.height = val;
    } else {
      this.heightError = true;
    }
  }
  handleWeight(val: string) {
    if (val) {
      this.weightError = false;
      this.weight = val;
    } else {
      this.weightError = true;
    }
  }
  handlePh(val: string) {
    if (val) {
      this.phError = false;
      this.ph = val;
    } else {
      this.phError = true;
    }
  }
  handleGender(val: string) {
    if (val) {
      this.genderError = false;
      this.gender = val;
    } else {
      this.genderError = true;
    }
  }
  handleEmail(val: string) {
    if (this.IsEmailVerified(val)) {
      this.emailError = false;
      this.email = val;
    } else {
      this.emailError = true;
    }
  }
  handlePassword(val: string) {
    if (val && val.length > 7) {
      this.passError = false;
      this.password = val;
    } else {
      this.passError = true;
    }
  }
  handleSubmit() {
    console.log(this.patientForm.value);
    if (
      this.patientForm.value.peselNo?.toString()?.length < 11 ||
      this.patientForm.value.peselNo?.toString()?.length > 11
    ) {
      alert('Please enter valid pesel number of 11 digit');
      return;
    } else if (this.patientForm.invalid) {
      this.patientForm.markAllAsTouched();
      this.snack.open('Please fill all the fields', 'close', {
        duration: 2000,
      });
      return;
    } else {
      const {
        name,
        email,
        password,
        gender,
        phone,
        age,
        height,
        weight,
        peselNo,
        DOB,
      } = this.patientForm.value;
      let data = {
        name,
        email,
        password,
        gender,
        phone,
        role: 'patient',
      };
      let docData = {
        name,
        gender,
        phone,
        age,
        doctor: this.roleUser._id,
        height,
        weight,
        peselNo,
        DOB,
      };
      this.loginService.createPatient(data, docData).subscribe(
        (res: any) => {
          this.snack.open('Patient created successfully', 'close', {
            duration: 2000,
          });
          this.getPatientsList();
          this.modalService.dismissAll();
        },
        (err) => {
          this.snack.open(err.message, 'close', {
            duration: 2000,
          });
        }
      );
      this.getPatientsList();
      this.modalService.dismissAll();
    }
  }
  goToDetailPage(id: string) {
    this.router.navigateByUrl(`/patients/patient-details/` + id);
  }
}
