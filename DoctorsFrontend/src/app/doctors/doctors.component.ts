import { Component, Inject, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../shared/Services/login/login.service';
import * as moment from 'moment';
import { DoctorService } from '../shared/Services/doctor/doctor.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss'],
})
export class DoctorsComponent implements OnInit {
  moment: any = moment;

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
  city: string = '';
  cityError: boolean = false;
  spec: string = '';
  specError: boolean = false;
  salary: string = '';
  salaryError: boolean = false;
  closeResult: string;
  modalOptions: NgbModalOptions;
  constructor(
    private modalService: NgbModal,
    public loginService: LoginService,
    public doctorService: DoctorService,
    private snack: MatSnackBar
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'lg',
      scrollable: true,
      centered: true,
    };
  }

  ngOnInit(): void {
    this.doctorService.subject.subscribe((data: any[]) => {
      if (data) {
        this.doctorsData = data.reverse();
      }
    });
    this.getDoctorsList();
  }
  getDoctorsList() {
    this.doctorService.getDoctors().subscribe((res: any[]) => {
      this.doctorsData = res.reverse();
    });
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
  handleCity(val: string) {
    if (val) {
      this.cityError = false;
      this.city = val;
    } else {
      this.cityError = true;
    }
  }
  handleSpec(val: string) {
    if (val) {
      this.specError = false;
      this.spec = val;
    } else {
      this.specError = true;
    }
  }
  handleSalary(val: string) {
    if (val) {
      this.salaryError = false;
      this.salary = val;
    } else {
      this.salaryError = true;
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
    if (
      this.name &&
      this.IsEmailVerified(this.email) &&
      this.password &&
      this.ph &&
      this.gender &&
      this.password.length > 7 &&
      this.passError === false &&
      this.emailError === false &&
      this.nameError === false &&
      this.phError === false &&
      this.genderError === false
    ) {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
        gender: this.gender,
        phone: this.ph,
        role: 'doctor',
      };
      let docData = {
        name: this.name,
        gender: this.gender,
        phone: this.ph,
      };
      this.loginService.CreateUser(data, docData);
      this.modalService.dismissAll();
      this.getDoctorsList();
    } else {
      alert('Ivalid inputs!');
    }
  }
}
