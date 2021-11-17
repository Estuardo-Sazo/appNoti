import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TypeReportsPageRoutingModule } from './type-reports-routing.module';

import { TypeReportsPage } from './type-reports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TypeReportsPageRoutingModule
  ],
  declarations: [TypeReportsPage]
})
export class TypeReportsPageModule {}
