import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DoctorsComponent } from './doctors.component';
import { DoctorsRoutingModule } from './doctors-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [DoctorsComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    // NgbModule,
    DoctorsRoutingModule,
    SharedModule,
  ],
})
export class DoctorsModule {}
