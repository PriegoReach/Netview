import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeasonDetailPage } from './season-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SeasonDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeasonDetailPageRoutingModule {}
