import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PatientsComponent } from './patients.component';
import { PatientsRoutingModule } from './patients-routing.module';
import { PatientDetailsComponent } from '../patient-details/patient-details.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [PatientsComponent, PatientDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    PatientsRoutingModule,
    SharedModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
  ],
  exports: [MatIconModule]
})
export class PatientsModule {}
