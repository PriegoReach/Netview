import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EpisodeListPage } from './episode-list.page';

const routes: Routes = [
  {
    path: '',
    component: EpisodeListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EpisodeListPageRoutingModule {}
