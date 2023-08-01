import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientDetailsComponent } from '../patient-details/patient-details.component';
import { PatientsComponent } from './patients.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PatientsComponent,
      },
      {
        path: 'patient-details/:id',
        component: PatientDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsRoutingModule {}
