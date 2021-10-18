import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReportPageRoutingModule } from './report-routing.module';
import { ReportPage } from './report.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { MapaComponent } from 'src/app/components/mapa/mapa.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ReportPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ReportPage]
})
export class ReportPageModule {}
