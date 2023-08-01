import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalDataComponent } from './medical-data.component';

describe('MedicalDataComponent', () => {
  let component: MedicalDataComponent;
  let fixture: ComponentFixture<MedicalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicalDataComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
