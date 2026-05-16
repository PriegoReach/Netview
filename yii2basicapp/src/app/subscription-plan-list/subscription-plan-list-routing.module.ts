import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriptionPlanListPage } from './subscription-plan-list.page';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionPlanListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionPlanListPageRoutingModule {}
