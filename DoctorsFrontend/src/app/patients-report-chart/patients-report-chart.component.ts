import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexLegend,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ChartComponent,
} from 'ng-apexcharts';
import { PatientService } from '../shared/Services/patient/patient.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
};

@Component({
  selector: 'app-patients-report-chart',
  templateUrl: './patients-report-chart.component.html',
  styleUrls: ['./patients-report-chart.component.scss'],
})
export class PatientsReportChartComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  @ViewChild('chartHeight') chartHeight: ChartComponent;
  @ViewChild('chartWeight') chartWeight: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptionsHeight: Partial<ChartOptions>;
  public chartOptionsWeight: Partial<ChartOptions>;

  constructor(public patientService: PatientService) {
    this.fetchReport();
    this.fetchHeightReport();
    this.fetchWeightReport();
  }

  ngOnInit() {}

  fetchReport() {
    this.patientService.getPatientsReport().subscribe((res: any) => {
      console.log(res);
      this.chartOptions = {
        series: [
          {
            name: 'Female',
            data: res.map((r) => r.patientsFemale.length),
          },
          {
            name: 'Male',
            data: res.map((r) => r.patientsMale.length),
          },
        ],
        chart: {
          id: 'chart',
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        xaxis: {
          type: 'category',
          categories: res.map((r) => `Age ${r.range}`),
          // categories: [
          //   "01/2011",
          //   "02/2011",
          //   "03/2011",
          //   "04/2011",
          //   "05/2011",
          //   "06/2011"
          // ]
        },
        legend: {
          position: 'right',
          offsetY: 40,
        },
        fill: {
          opacity: 1,
        },
      };
    });
  }

  fetchHeightReport() {
    this.patientService.getPatientsReportHeight().subscribe((res: any) => {
      this.chartOptionsHeight = {
        series: [
          {
            name: 'Female',
            data: res.map((r) => r.patientsFemale.length),
          },
          {
            name: 'Male',
            data: res.map((r) => r.patientsMale.length),
          },
        ],
        chart: {
          id: 'chartHeight',
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        xaxis: {
          type: 'category',
          categories: res.map((r) => `Height ${r.range} (cm)`),
          // categories: [
          //   "01/2011",
          //   "02/2011",
          //   "03/2011",
          //   "04/2011",
          //   "05/2011",
          //   "06/2011"
          // ]
        },
        legend: {
          position: 'right',
          offsetY: 40,
        },
        fill: {
          opacity: 1,
        },
      };
    });
  }

  fetchWeightReport() {
    this.patientService.getPatientsReportWeight().subscribe((res: any) => {
      this.chartOptionsWeight = {
        series: [
          {
            name: 'Female',
            data: res.map((r) => r.patientsFemale.length),
          },
          {
            name: 'Male',
            data: res.map((r) => r.patientsMale.length),
          },
        ],
        chart: {
          id: 'chartWeight',
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        xaxis: {
          type: 'category',
          categories: res.map((r) => `Weight ${r.range} (kg)`),
          // categories: [
          //   "01/2011",
          //   "02/2011",
          //   "03/2011",
          //   "04/2011",
          //   "05/2011",
          //   "06/2011"
          // ]
        },
        legend: {
          position: 'right',
          offsetY: 40,
        },
        fill: {
          opacity: 1,
        },
      };
    });
  }
}
