import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import * as moment from 'moment';
import { BloodSugarService } from 'src/app/shared/Services/BloodSugar/BloodSugar.service';

@Component({
  selector: 'app-blood-sugar',
  templateUrl: './blood-sugar.component.html',
  styleUrls: ['./blood-sugar.component.scss'],
})
export class BloodSugarComponent implements OnInit {
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

  constructor(public bloodSugarService: BloodSugarService) {
    let a = localStorage.getItem('userDataDetails');
    this.user = JSON.parse(a);
    this.chartTitle = `All Blood Sugar Measurements for ${this.user.name}`;
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
    this.bloodSugarService.subject.subscribe((data: any) => {
      if (data) {
        this.paramsData = data;
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
    this.bloodSugarService
      .getBloodSugarsByPatientId({ patientId: this.patientId })
      .subscribe((res: any[]) => {
        this.paramsData = res.slice().reverse();
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
        doctor: this.roleUser._id,
      };
      this.bloodSugarService.CreateBloodSugar(data);
      this.getParamsList();
      this.clearAll();
      this.refreshList.emit('sugar');
    } else {
      alert('Ivalid inputs!');
    }
  }
}
