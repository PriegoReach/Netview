import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeasonListPage } from './season-list.page';

const routes: Routes = [
  {
    path: '',
    component: SeasonListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeasonListPageRoutingModule {}
