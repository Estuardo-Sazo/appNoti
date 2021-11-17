import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypeReportsPage } from './type-reports.page';

const routes: Routes = [
  {
    path: '',
    component: TypeReportsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypeReportsPageRoutingModule {}
