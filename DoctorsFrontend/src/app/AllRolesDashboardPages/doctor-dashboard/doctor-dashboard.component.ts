import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/doctors/dashboard.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss']
})
export class DoctorDashboardComponent implements OnInit {

  bloodPressure: any[]
  heartRate: any[]
  saturation: any[]
  bloodSugar: any[]
  constructor(
    private dashboardSvc: DashboardService,
    private router: Router
  ) {
    this.getAbnormalBloodPressurePatientCount()
    this.getAbnormalHeartRatePatientCount()
    this.getAbnormalSaturationPatientCount()
    this.getAbnormalBloodSugarPatientCount()
  }

  private getAbnormalBloodPressurePatientCount() {
    this.dashboardSvc.getAbnormalBloodPressurePatientCount().subscribe((res: any) => {
      this.bloodPressure = res;
    })
  }
  private getAbnormalHeartRatePatientCount() {
    this.dashboardSvc.getAbnormalHeartRatePatientCount().subscribe((res: any) => {
      this.heartRate = res;
    })
  }
  private getAbnormalSaturationPatientCount() {
    this.dashboardSvc.getAbnormalSaturationPatientCount().subscribe((res: any) => {
      this.saturation = res;
    })
  }
  private getAbnormalBloodSugarPatientCount() {
    this.dashboardSvc.getAbnormalBloodSugarPatientCount().subscribe((res: any) => {
      this.bloodSugar = res;
    })
  }



  ngOnInit() {
  }

  navigateBloodPressure() {
    this.router.navigate(['/dashboard/abnormal-patients'], { queryParams: { type: 'BloodPressure' } })
  }
  navigateBloodSugar() {
    this.router.navigate(['/dashboard/abnormal-patients'], { queryParams: { type: 'BloodSugar' } })
  }
  navigateHeartRate() {
    this.router.navigate(['/dashboard/abnormal-patients'], { queryParams: { type: 'HeartRate' } })
  }
  navigateSaturation() {
    this.router.navigate(['/dashboard/abnormal-patients'], { queryParams: { type: 'Saturation' } })
  }

}
