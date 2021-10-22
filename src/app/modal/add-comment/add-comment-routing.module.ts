import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCommentPage } from './add-comment.page';

const routes: Routes = [
  {
    path: '',
    component: AddCommentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCommentPageRoutingModule {}
