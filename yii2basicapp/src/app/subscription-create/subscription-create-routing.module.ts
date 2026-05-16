import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriptionCreatePage } from './subscription-create.page';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionCreatePageRoutingModule {}
