import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import * as moment from 'moment';
import { HeartRateService } from 'src/app/shared/Services/HeartRate/HeartRate.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaturationService } from '../../Services/saturation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-saturation',
  templateUrl: './saturation.component.html',
  styleUrls: ['./saturation.component.scss'],
})
export class SaturationComponent implements OnInit {
  @Input() patientId: string = '';
  @Output() refreshList = new EventEmitter(true);
  @Input() refreshGrid: boolean = false;
  moment: any = moment;
  rate: string = '';
  rateError: boolean = false;
  desc: string = '';
  descError: boolean = false;
  paramsData: any[] = [];
  user: any = {};
  roleUser: any = {};
  chartData: any[] = [];
  xAxisArray: any[] = [];
  chartTitle: string;

  saturationForm: FormGroup;
  saturation: any;
  constructor(
    public heartRateService: HeartRateService,
    private fb: FormBuilder,
    private saturationService: SaturationService,
    private snack: MatSnackBar
  ) {
    let a = localStorage.getItem('userDataDetails');
    this.user = JSON.parse(a);
    this.chartTitle = `All Saturation Measurements for ${this.user.name}`;
  }

  onSaturationChange(event) {
    console.log(this.saturation);
  }
  ngOnChanges() {
    if (this.refreshGrid) {
      this.refreshList.emit('sugar');
    }
  }
  ngOnInit(): void {
    this.createForm();
    this.getAllSaturation();
  }
  createForm() {
    this.saturationForm = this.fb.group({
      rate: ['', Validators.required],
    });
  }

  getParamsList() {
    this.heartRateService
      .getHeartRatesByPatientId({ patientId: this.patientId })
      .subscribe((res: any[]) => {
        this.paramsData = res;
        let dataArray = [];
        let axisArr = [];
        res.forEach((element) => {
          dataArray.push(parseInt(element.rate));
          axisArr.push(moment(element.created_at).format('YYYY-MM-DD'));
        });
        this.chartData = dataArray;
        this.xAxisArray = axisArr;
      });
  }
  handleRate(val: string) {
    if (val) {
      this.rateError = false;
      this.rate = val;
    } else {
      this.rateError = true;
    }
  }
  handleDesc(val: string) {
    if (val) {
      this.descError = false;
      this.desc = val;
    } else {
      this.descError = true;
    }
  }
  clearAll() {
    this.rate = '';
    this.desc = '';
    this.rateError = false;
    this.descError = false;
  }
  handleAddParam() {
    if (this.rate && this.rateError === false) {
      let data = {
        rate: this.rate,
        patient: this.patientId,
        doctor: JSON.parse(localStorage.roleUser)?._id,
      };
      this.heartRateService.CreateHeartRate(data);
      this.getParamsList();
      this.clearAll();
      this.refreshList.emit('sugar');
    } else {
      alert('Ivalid inputs!');
    }
  }

  getAllSaturation() {
    this.saturationService
      .getSaturationByPatientId(this.patientId)
      .subscribe((res: any) => {
        this.paramsData = res?.saturation?.slice().reverse() || [];
        let dataArray = [];
        let axisArr = [];
        res.saturation?.forEach((element) => {
          dataArray.push(parseInt(element.rate));
          axisArr.push(moment(element.created_at).format('YYYY-MM-DD'));
        });
        this.chartData = dataArray;
        this.xAxisArray = axisArr;
      });
  }
  onSubmit() {
    const data = {
      rate: this.saturation,
      patient: this.patientId,
      doctor: JSON.parse(localStorage.roleUser)?._id,
    };

    this.saturationService.createSaturation(data).subscribe(
      (res) => {
        this.saturationForm.reset();
        this.getAllSaturation();
        this.refreshList.emit('sugar');

        // this.snack.open('Saturation added successfully', 'Close', {
        //   duration: 2000,
        // });
      },
      ({ error }) => {
        this.snack.open(error.message || 'Something went wrong', 'Close', {
          duration: 2000,
        });
        console.log(error);
      }
    );
  }
}
