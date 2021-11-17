import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListEditorPageRoutingModule } from './list-editor-routing.module';

import { ListEditorPage } from './list-editor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListEditorPageRoutingModule
  ],
  declarations: [ListEditorPage]
})
export class ListEditorPageModule {}
