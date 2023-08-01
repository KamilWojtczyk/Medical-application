import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
// import { NgxGalleryModule } from '@kolkov/ngx-gallery';

import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { VerifyComponent } from '../verify/verify.component';
@NgModule({
  declarations: [VerifyComponent],
  imports: [
    // NgxGalleryModule,
    HttpClientModule,
    SharedModule,
    CommonModule,
    // NgbModule,
    LoginRoutingModule,
    FormsModule,
  ],
  providers: [],
})
export class LoginModule {}
