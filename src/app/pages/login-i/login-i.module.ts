import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginIPageRoutingModule } from './login-i-routing.module';

import { LoginIPage } from './login-i.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginIPageRoutingModule,
    ComponentsModule
  ],
  declarations: [LoginIPage]
})
export class LoginIPageModule {}
