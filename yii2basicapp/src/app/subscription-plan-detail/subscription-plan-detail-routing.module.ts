import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriptionPlanDetailPage } from './subscription-plan-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionPlanDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionPlanDetailPageRoutingModule {}
