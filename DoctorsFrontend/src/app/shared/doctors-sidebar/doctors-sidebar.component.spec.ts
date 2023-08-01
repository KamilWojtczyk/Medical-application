import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsSidebarComponent } from './doctors-sidebar.component';

describe('DoctorsSidebarComponent', () => {
  let component: DoctorsSidebarComponent;
  let fixture: ComponentFixture<DoctorsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorsSidebarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
