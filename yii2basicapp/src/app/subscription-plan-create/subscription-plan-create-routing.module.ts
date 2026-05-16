import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriptionPlanCreatePage } from './subscription-plan-create.page';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionPlanCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionPlanCreatePageRoutingModule {}
