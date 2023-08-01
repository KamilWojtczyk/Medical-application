import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MedicalDataComponent } from './medical-data.component';
import { MedicalDataRoutingModule } from './medical-data-routing.module';

@NgModule({
  declarations: [MedicalDataComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    MedicalDataRoutingModule,
    // NgbModule,
    SharedModule,
  ],
})
export class MedicalDataModule {}
