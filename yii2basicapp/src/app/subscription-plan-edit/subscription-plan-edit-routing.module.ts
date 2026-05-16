import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriptionPlanEditPage } from './subscription-plan-edit.page';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionPlanEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionPlanEditPageRoutingModule {}
