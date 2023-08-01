import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { DoctorDashboardComponent } from '../AllRolesDashboardPages/doctor-dashboard/doctor-dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DoctorDashboardComponent,
  ],
  exports: [
    DoctorDashboardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    // NgbModule,
    DashboardRoutingModule,
  ],
})
export class DashboardModule {}