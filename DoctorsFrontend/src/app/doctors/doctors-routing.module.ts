import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorsComponent } from './doctors.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DoctorsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorsRoutingModule {}
