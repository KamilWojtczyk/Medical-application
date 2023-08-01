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

@Component({
  selector: 'app-heart-rate',
  templateUrl: './heart-rate.component.html',
  styleUrls: ['./heart-rate.component.scss'],
})
export class HeartRateComponent implements OnInit {
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

  constructor(public heartRateService: HeartRateService) {
    let a = localStorage.getItem('userDataDetails');
    this.user = JSON.parse(a);
    this.chartTitle = `All Heart Rate Measurements for ${this.user.name}`;
  }

  ngOnChanges() {
    if (this.refreshGrid) {
      this.hookFunction();
      this.refreshList.emit('sugar');
    }
  }
  ngOnInit(): void {
    this.hookFunction();
  }
  hookFunction() {
    this.heartRateService.subject.subscribe((data: any[]) => {
      if (data) {
        this.paramsData = data.slice().reverse();
        let dataArray = [];
        let axisArr = [];
        data.forEach((element) => {
          dataArray.push(parseInt(element.rate));
          axisArr.push(moment(element.created_at).format('YYYY-MM-DD'));
        });
        this.chartData = dataArray;
        this.xAxisArray = axisArr;
      }
    });
    this.getParamsList();
    let b = localStorage.getItem('roleUser');
    this.roleUser = JSON.parse(b);
  }
  getParamsList() {
    this.heartRateService
      .getHeartRatesByPatientId({ patientId: this.patientId })
      .subscribe((res: any[]) => {
        this.paramsData = res.slice().reverse();
        let dataArray = [];
        let axisArr = [];
        res.forEach((element) => {
          dataArray.push(parseInt(element.rate));
          axisArr.push(moment(element.created_at).format('MM-DD-YYYY'));
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
        doctor: this.roleUser._id,
      };
      this.heartRateService.CreateHeartRate(data);
      this.getParamsList();
      this.clearAll();
      this.refreshList.emit('sugar');
    } else {
      alert('Ivalid inputs!');
    }
  }
}
