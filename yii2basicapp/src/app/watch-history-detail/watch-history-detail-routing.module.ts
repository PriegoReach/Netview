import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WatchHistoryDetailPage } from './watch-history-detail.page';

const routes: Routes = [
  {
    path: '',
    component: WatchHistoryDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchHistoryDetailPageRoutingModule {}
