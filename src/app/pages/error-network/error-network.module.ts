import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ErrorNetworkPageRoutingModule } from './error-network-routing.module';

import { ErrorNetworkPage } from './error-network.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ErrorNetworkPageRoutingModule
  ],
  declarations: [ErrorNetworkPage]
})
export class ErrorNetworkPageModule {}
