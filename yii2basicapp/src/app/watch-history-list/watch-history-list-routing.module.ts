import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WatchHistoryListPage } from './watch-history-list.page';

const routes: Routes = [
  {
    path: '',
    component: WatchHistoryListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchHistoryListPageRoutingModule {}
