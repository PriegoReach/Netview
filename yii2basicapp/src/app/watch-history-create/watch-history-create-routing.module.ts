import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WatchHistoryCreatePage } from './watch-history-create.page';

const routes: Routes = [
  {
    path: '',
    component: WatchHistoryCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchHistoryCreatePageRoutingModule {}
