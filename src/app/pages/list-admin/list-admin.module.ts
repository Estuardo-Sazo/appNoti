import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListAdminPageRoutingModule } from './list-admin-routing.module';

import { ListAdminPage } from './list-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListAdminPageRoutingModule
  ],
  declarations: [ListAdminPage]
})
export class ListAdminPageModule {}
