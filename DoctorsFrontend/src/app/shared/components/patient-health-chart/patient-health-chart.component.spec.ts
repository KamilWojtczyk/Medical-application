import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientHealthChartComponent } from './patient-health-chart.component';

describe('PatientHealthChartComponent', () => {
  let component: PatientHealthChartComponent;
  let fixture: ComponentFixture<PatientHealthChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientHealthChartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientHealthChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
