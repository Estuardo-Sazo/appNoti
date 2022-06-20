import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddReportPage } from './add-report.page';

const routes: Routes = [
  {
    path: '',
    component: AddReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddReportPageRoutingModule {}
