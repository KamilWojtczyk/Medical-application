import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { PatientService } from 'src/app/shared/Services/patient/patient.service';
import { Patient } from 'src/app/shared/models/patient';

import { Chart, ChartDataset, ChartType } from 'chart.js';
import 'chartjs-adapter-moment';
import { ChartService } from 'src/app/shared/Services/chart.service';
export type _ChartOptions = {};

@Component({
  selector: 'app-analitics',
  templateUrl: './analitics.component.html',
  styleUrls: ['./analitics.component.scss'],
})
export class AnaliticsComponent implements OnInit {
  @ViewChild('content') content: TemplateRef<any>;
  patientsData: any = [];
  myPatients: Patient[] = [];
  checkboxes: any[] = [
    {
      name: 'Blood Pressure',
      value: 'bloodPressure',
      checked: true,
      formControlName: 'bloodPressure',
    },
    {
      name: 'Blood Sugar',
      value: 'bloodSugar',
      checked: true,
      formControlName: 'bloodSugar',
    },
    {
      name: 'Heart Rate',
      value: 'heartRate',
      checked: true,
      formControlName: 'heartRate',
    },
    {
      name: 'Saturation',
      value: 'saturation',
      checked: true,
      formControlName: 'saturation',
    },
  ];

  chartForm: FormGroup;

  charts: any[] = [];
  bloodPressure: any[] = [];
  bloodSugar: any[] = [];
  heartRate: any[] = [];
  saturation: any[] = [];

  constructor(
    public patientService: PatientService,
    private modalService: NgbModal,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private chartService: ChartService
  ) {}
  ngOnInit(): void {
    this.createForm();
    this.getPatientsList();
    this.getPatientsByDoctor();
    this.onChartArrayChanges();
  }

  createForm() {
    const { startOfRange, endOfRange } = this.getStartAndEndOfWeek();
    console.log(startOfRange, endOfRange);
    this.chartForm = this.fb.group({
      patientId: ['', Validators.required],
      bloodPressure: [[]],
      bloodSugar: [[]],
      heartRate: [[]],
      saturation: [[]],
      measurement: ['', Validators.required],
      startDate: [startOfRange, Validators.required],
      endDate: [endOfRange, Validators.required],
    });
  }
  onChartArrayChanges() {
    this.chartService.charts.subscribe((res: any) => {
      console.log(res);
      this.charts = res;
    });
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
  openDialog() {
    const dialogRef = this.dialog.open(this.content, {
      width: '70%',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onCreateChart() {
    console.log(this.chartForm.value);
    this.patientService.getPatientHealthReport(this.chartForm.value).subscribe(
      (res: any) => {
        const title = this.createTitle();
        const label = this.checkboxes.find(
          (x) => x.value == this.chartForm.value.measurement
        ).name;
        // const data = res?.report[this.chartForm.value.measurement].map((x) => {
        //   return {
        //     x: moment(x.createdAt).format('MM/DD/YYYY'),
        //     y: +x.rate,
        //   };
        // });
        const data = res?.report[this.chartForm.value.measurement].map(
          (x) => +x.rate
        );
        const labels = res?.report[this.chartForm.value.measurement].map((x) =>
          moment(x.createdAt).format('MM/DD/YYYY')
        );
        const chart = {
          data,
          label,
          title,
          labels,
        };
        console.log({ chart });
        // chart.series = this.createChartSeries(res);
        this.chartService.addChart(chart);
        // this.charts.push(chart);
        this.chartForm.get('patientId').reset();

        this.resetMeasurements();

        console.log(this.charts);
      },
      (err) => {}
    );
  }

  createTitle() {
    const selectedMeasurement = this.getSelectedMeasurements();
    const measurementName = this.checkboxes.find(
      (x) => x.value === this.chartForm.value.measurement
    )?.name;
    const patient = this.patientsData.find(
      (x) => x._id === this.chartForm.value.patientId
    );
    let title = '';
    if (patient) {
      title = `All ${measurementName} Measurements for (${patient.name})`;
    } else {
      title = `All ${measurementName} Measurements`;
    }
    return title;
  }

  onDelete(index) {
    this.chartService.removeChart(index);
  }

  onPatientSelectionChange(event) {
    if (!this.chartForm.value.startDate || !this.chartForm.value.endDate) {
      alert('Please select start and end date first');
      this.chartForm.get('patientId').setValue('');
      return;
    }
    console.log(event.value);
    this.patientService
      .getPatientHealthReport(this.chartForm.value)
      .subscribe((res: any) => {
        console.log(res);
        this.bloodPressure = res?.report?.bloodPressure;
        this.bloodSugar = res?.report?.sugar;
        this.heartRate = res?.report?.heartRate;
        this.saturation = res?.report?.saturation;
      });
  }

  onMeasureMentChange(event, type: string) {
    this.conditionallyDisable();
  }
  isAnyMeasurementSelected() {
    const checkboxValues = this.chartForm.value;
    return (
      checkboxValues.bloodPressure?.length > 0 ||
      checkboxValues.bloodSugar?.length > 0 ||
      checkboxValues.heartRate?.length > 0 ||
      checkboxValues.saturation?.length > 0
    );
  }

  resetMeasurements() {
    this.chartForm.get('bloodPressure').reset();
    this.chartForm.get('bloodSugar').reset();
    this.chartForm.get('heartRate').reset();
    this.chartForm.get('saturation').reset();
    this.conditionallyDisable();
  }

  conditionallyDisable() {
    const checkboxValues = this.chartForm.value;
    if (checkboxValues.bloodPressure?.length > 0) {
      this.chartForm.get('bloodSugar').disable();
      this.chartForm.get('heartRate').disable();
      this.chartForm.get('saturation').disable();
    } else if (checkboxValues.bloodSugar?.length > 0) {
      this.chartForm.get('bloodPressure').disable();
      this.chartForm.get('heartRate').disable();
      this.chartForm.get('saturation').disable();
    } else if (checkboxValues.heartRate?.length > 0) {
      this.chartForm.get('bloodSugar').disable();
      this.chartForm.get('bloodPressure').disable();
      this.chartForm.get('saturation').disable();
    } else if (checkboxValues.saturation?.length > 0) {
      this.chartForm.get('bloodSugar').disable();
      this.chartForm.get('heartRate').disable();
      this.chartForm.get('bloodPressure').disable();
    } else {
      this.chartForm.get('bloodSugar').enable();
      this.chartForm.get('heartRate').enable();
      this.chartForm.get('bloodPressure').enable();
      this.chartForm.get('saturation').enable();
    }
  }

  getSelectedMeasurements() {
    let control = null;
    const checkboxValues = this.chartForm.value;
    if (checkboxValues.bloodPressure?.length > 0) {
      control = 'bloodPressure';
    }
    if (checkboxValues.bloodSugar?.length > 0) {
      control = 'bloodSugar';
    }
    if (checkboxValues.heartRate?.length > 0) {
      control = 'heartRate';
    }
    if (checkboxValues.saturation?.length > 0) {
      control = 'saturation';
    }
    return control;
  }
  getStartAndEndOfWeek() {
    const currentDate = new Date();
    const startOfRange = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 3
    )
      .toISOString()
      .slice(0, 10);
    const endOfRange = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 3
    )
      .toISOString()
      .slice(0, 10);

    return {
      startOfRange,
      endOfRange,
    };
  }
}
