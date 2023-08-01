import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientAbnormalReportComponent } from './patient-abnormal-report.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PatientAbnormalReportComponent,
      },
    ],
  },
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PatientAbnormalReportComponent]
})
export class PatientAbnormalReportModule { }
