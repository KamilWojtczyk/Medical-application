import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnaliticsComponent } from './analitics/analitics.component';
import { AnaliticsRoutingModule } from './analitics-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AnaliticsComponent],
  imports: [CommonModule, AnaliticsRoutingModule, SharedModule],
})
export class AnaliticsModule {}
