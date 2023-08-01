import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseURL: string = environment.apiURL;

  constructor(private httpClient: HttpClient) { }

  getAbnormalBloodPressurePatientCount() {
    return this.httpClient.get(`${this.baseURL}/patients/report/abnormalCount/bloodPressure`);
  }
  getAbnormalHeartRatePatientCount() {
    return this.httpClient.get(`${this.baseURL}/patients/report/abnormalCount/heartRate`);
  }
  getAbnormalSaturationPatientCount() {
    return this.httpClient.get(`${this.baseURL}/patients/report/abnormalCount/saturation`);
  }
  getAbnormalBloodSugarPatientCount() {
    return this.httpClient.get(`${this.baseURL}/patients/report/abnormalCount/bloodSugar`);
  }
  
  getPatientAbnormalReport(patientId: string) {
    return this.httpClient.get(`${this.baseURL}/patients/report/abnormal/${patientId}`);
  }

}
