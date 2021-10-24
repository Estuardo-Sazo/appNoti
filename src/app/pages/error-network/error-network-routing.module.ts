import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorNetworkPage } from './error-network.page';

const routes: Routes = [
  {
    path: '',
    component: ErrorNetworkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorNetworkPageRoutingModule {}
