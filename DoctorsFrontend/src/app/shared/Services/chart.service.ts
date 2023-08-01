import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  public charts: BehaviorSubject<any> = new BehaviorSubject([]);
  constructor() {}

  addChart(chart: any) {
    this.charts.next([...this.charts.value, chart]);
  }
  getCharts(): Observable<any> {
    return this.charts.value;
  }
  removeChart(index) {
    const charts = this.charts.value;
    charts.splice(index, 1);
    this.charts.next(charts);
  }

  purgeCharts() {
    this.charts.next([]);
  }
}
