import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SaturationService {
  baseURL: string = environment.apiURL;
  constructor(private httpClient: HttpClient) {}

  createSaturation(data): Observable<any> {
    return this.httpClient.post(
      this.baseURL + '/saturation/createSaturation',
      data
    );
  }

  getSaturationByPatientId(patientId: string): Observable<any> {
    return this.httpClient.get(
      this.baseURL + '/saturation/getSaturationByPatientId/' + patientId
    );
  }
}
