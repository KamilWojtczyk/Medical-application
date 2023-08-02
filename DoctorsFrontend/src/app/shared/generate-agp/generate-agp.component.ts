import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { BloodSugarService } from '../Services/BloodSugar/BloodSugar.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agp-chart',
  templateUrl: './generate-agp.component.html',
  styleUrls: ['./generate-agp.component.scss'],
})
export class AgpChartComponent implements OnInit {
  moment: any = moment;

  @Input() patientMinGlucoseEmptyStomach = 70;
  @Input() patientMaxGlucoseEmptyStomach = 99;
  @Input() patientMaxGlucoseAfterMeal = 140;
  @Input() patientWithDiabetes = 180;

  hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  user: any = {};
  selectedDate = null;
  patientId = null;

  isShowChart = true;
  glucoseAverageData = [];
  glucoseMinData = [];
  glucoseMaxData = [];

  constructor(
    private route: ActivatedRoute,
    private bloodSugarService: BloodSugarService
  ) {}

  ngOnInit() {
    this.selectedDate = moment(new Date()).format('YYYY-MM-DD');
    this.getLocalStorage();
    this.getParams();
    this.getAPG();
  }

  getParams() {
    this.route.params.subscribe((params) => {
      this.patientId = params.id;
    });
  }

  getLocalStorage() {
    let userDataDetails = localStorage.getItem('userDataDetails');
    this.user = JSON.parse(userDataDetails);
  }

  getAPG() {
    this.bloodSugarService
      .getAPGByPatientIdAndDate({
        patientId: this.patientId,
        date: this.selectedDate,
      })
      .subscribe({
        next: (v) => this.handleGetAPGSuccessResponse(v),
        error: (e) => this.handleGetAPGErrorResponse(e),
      });
  }

  handleGetAPGSuccessResponse(res) {
    this.glucoseAverageData = res.glucoseAverageData;
    this.glucoseMinData = res.glucoseMinData;
    this.glucoseMaxData = res.glucoseMaxData;
    this.removeAGPChart();
    this.drawAGPChart();
  }

  handleGetAPGErrorResponse(err) {
    this.removeAGPChart();
  }

  onClickSearch() {
    this.getAPG();
  }

  removeAGPChart() {
    this.isShowChart = false;
    const chartStatus = Chart.getChart('agpChart'); // <canvas> id
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }
  }

  drawAGPChart() {
    this.isShowChart = true;
    const ctx = (<HTMLCanvasElement>(
      document.getElementById('agpChart')
    )).getContext('2d');

    const agpChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.hours,
        datasets: [
          {
            label: 'Average Glucose',
            data: this.glucoseAverageData,
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
          },
          {
            label: 'Glucose Range Min',
            data: this.glucoseMinData,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderDash: [5, 5],
          },
          {
            label: 'Glucose Range Max',
            data: this.glucoseMaxData,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderDash: [5, 5],
          },
          {
            label: 'Patient with probable diabetes',
            data: Array(24).fill(this.patientWithDiabetes),
            borderColor: 'red',
            borderWidth: 2,
            fill: {
              target: 'end',
            },
            backgroundColor: 'rgba(255, 69, 0, 0.1)',
          },
          {
            label: 'Patient Max Accepted Glucose After Meal',
            data: Array(24).fill(this.patientMaxGlucoseAfterMeal),
            borderColor: 'orange',
            borderWidth: 2,
            fill: {
              target: 5,
            },
            backgroundColor: 'rgba(255, 165, 0, 0.2)',
          },
          {
            label: 'Patient Max Glucose On Empty Stomach',
            data: Array(24).fill(this.patientMaxGlucoseEmptyStomach),
            borderColor: 'green',
            borderWidth: 2,
            fill: {
              target: 6,
            },
            backgroundColor: 'rgba(11, 156, 49, 0.2)',
          },
          {
            label: 'Patient Min Glucose On Empty Stomach',
            data: Array(24).fill(this.patientMinGlucoseEmptyStomach),
            borderColor: 'green',
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
