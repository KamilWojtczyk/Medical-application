import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicalDataComponent } from './medical-data.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MedicalDataComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalDataRoutingModule {}
