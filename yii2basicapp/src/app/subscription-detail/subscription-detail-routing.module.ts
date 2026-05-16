import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriptionDetailPage } from './subscription-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionDetailPageRoutingModule {}
