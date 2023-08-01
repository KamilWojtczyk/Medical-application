import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import {
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PatientsReportChartComponent } from '../patients-report-chart/patients-report-chart.component';
import { AuthInterceptor } from './Services/authInterceptor/authIntercept';
import { BloodPressureComponent } from './SubComponents/blood-pressure/blood-pressure.component';
import { BloodSugarComponent } from './SubComponents/blood-sugar/blood-sugar.component';
import { HeartRateComponent } from './SubComponents/heart-rate/heart-rate.component';
import { SaturationComponent } from './SubComponents/saturation/saturation.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { PatientHealthChartComponent } from './components/patient-health-chart/patient-health-chart.component';
import { OnlyNumber } from './directives/onlynumber.directive';
import { RestrictFutureDatesDirective } from './directives/restrictFutureDates.directive';
import { DoctorsSidebarComponent } from './doctors-sidebar/doctors-sidebar.component';
import { AdminGuard } from './guard/admin.guard';
import { AdminAndDoctorGuard } from './guard/adminAndDoctor.guard';
import { PatientGuard } from './guard/patientGaurd';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DynamicChartComponent } from './components/dynamic-chart/dynamic-chart.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { MatBadgeModule } from '@angular/material/badge';
import { AgpChartComponent } from './generate-agp/generate-agp.component';

// Directives

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidenavComponent,
    DoctorsSidebarComponent,
    AdminSidebarComponent,
    BloodPressureComponent,
    BloodSugarComponent,
    HeartRateComponent,
    RestrictFutureDatesDirective,
    AgpChartComponent,
    SaturationComponent,
    PatientsReportChartComponent,
    PatientHealthChartComponent,
    DynamicChartComponent,
    NotificationsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    NgApexchartsModule,
    // * MATERIAL IMPORTS
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,

    MatListModule,
    MatDialogModule,
    MatSelectModule,
    NgbDropdownModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatCardModule,
    MatBadgeModule,
    NgbModule,
  ],
  exports: [
    HeaderComponent,
    NotificationsComponent,
    SidenavComponent,
    DoctorsSidebarComponent,
    AdminSidebarComponent,
    BloodPressureComponent,
    BloodSugarComponent,
    HeartRateComponent,
    SaturationComponent,
    PatientsReportChartComponent,
    DynamicChartComponent,
    MatSnackBarModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    MatIconModule,
    RestrictFutureDatesDirective,
    AgpChartComponent,
    MatDialogModule,
    MatSelectModule,
    NgbDropdownModule,
    MatButtonModule,
    MatCheckboxModule,
    NgApexchartsModule,
    MatDatepickerModule,
    MatCardModule,
    MatBadgeModule,
    NgbModule,
  ],
  providers: [
    AdminGuard,
    AdminAndDoctorGuard,
    PatientGuard,
    OnlyNumber,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}
