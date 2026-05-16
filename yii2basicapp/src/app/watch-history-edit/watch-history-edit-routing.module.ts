import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WatchHistoryEditPage } from './watch-history-edit.page';

const routes: Routes = [
  {
    path: '',
    component: WatchHistoryEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchHistoryEditPageRoutingModule {}
