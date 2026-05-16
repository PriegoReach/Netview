import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriptionEditPage } from './subscription-edit.page';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionEditPageRoutingModule {}
