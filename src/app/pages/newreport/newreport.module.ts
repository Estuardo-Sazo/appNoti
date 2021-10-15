import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NewreportPageRoutingModule } from './newreport-routing.module';
import { NewreportPage } from './newreport.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    ExploreContainerComponentModule,
    NewreportPageRoutingModule
  ],
  declarations: [NewreportPage],
})
export class NewreportPageModule {}
