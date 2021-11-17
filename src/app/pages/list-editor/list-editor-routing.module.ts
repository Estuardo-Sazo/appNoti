import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListEditorPage } from './list-editor.page';

const routes: Routes = [
  {
    path: '',
    component: ListEditorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListEditorPageRoutingModule {}
