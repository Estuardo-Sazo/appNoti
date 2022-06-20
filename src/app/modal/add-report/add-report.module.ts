import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddReportPageRoutingModule } from './add-report-routing.module';

import { AddReportPage } from './add-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddReportPageRoutingModule
  ],
  declarations: [AddReportPage]
})
export class AddReportPageModule {}
