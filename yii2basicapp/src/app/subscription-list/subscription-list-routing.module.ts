import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriptionListPage } from './subscription-list.page';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionListPageRoutingModule {}
