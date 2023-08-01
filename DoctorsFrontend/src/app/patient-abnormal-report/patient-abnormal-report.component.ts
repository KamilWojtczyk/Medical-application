import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../doctors/dashboard.service';
import * as moment from 'moment';

@Component({
  selector: 'app-patient-abnormal-report',
  templateUrl: './patient-abnormal-report.component.html',
  styleUrls: ['./patient-abnormal-report.component.scss']
})
export class PatientAbnormalReportComponent implements OnInit {

  type: 'BloodPressure' | 'BloodSugar' | 'HeartRate' | 'Saturation'
  patientsData: any[] = [];
  title = '';
  moment: any = moment;

  constructor(
    private dashboardSvc: DashboardService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((res: any) => {
      this.type = res['type'];
      this.setTitle();
      this.fetchList();
    })
  }

  ngOnInit() {
  }

  setTitle() {
    switch (this.type) {
      case 'BloodPressure':
        this.title = `Patients with high blood pressure`
        break;
      case 'BloodSugar':
        this.title = `Patients with high blood sugar`
        break;
      case 'HeartRate':
        this.title = `Patients with high heart rate`
        break;
      case 'Saturation':
        this.title = `Patients with low saturation`
        break;
    }
  }

  fetchList() {
    switch (this.type) {
      case 'BloodPressure':
        this.dashboardSvc.getAbnormalBloodPressurePatientCount().subscribe((res: any) => {
          this.patientsData = res;
        })
        break;
      case 'BloodSugar':
        this.dashboardSvc.getAbnormalBloodSugarPatientCount().subscribe((res: any) => {
          this.patientsData = res;
        })
        break;
      case 'HeartRate':
        this.dashboardSvc.getAbnormalHeartRatePatientCount().subscribe((res: any) => {
          this.patientsData = res;
        })
        break;
      case 'Saturation':
        this.dashboardSvc.getAbnormalSaturationPatientCount().subscribe((res: any) => {
          this.patientsData = res;
        })
        break;
    }
  }

  goToDetailPage(id: string) {
    this.router.navigateByUrl(`/patients/patient-details/` + id);
  }

}
