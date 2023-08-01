import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnaliticsComponent } from './analitics/analitics.component';
const routes: Routes = [
  {
    path: '',
    component: AnaliticsComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnaliticsRoutingModule {}
