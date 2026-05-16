import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RatingListPage } from './rating-list.page';

const routes: Routes = [
  {
    path: '',
    component: RatingListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RatingListPageRoutingModule {}
