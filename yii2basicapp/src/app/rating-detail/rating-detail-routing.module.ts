import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RatingDetailPage } from './rating-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RatingDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RatingDetailPageRoutingModule {}
