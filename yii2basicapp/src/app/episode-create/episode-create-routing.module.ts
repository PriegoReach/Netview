import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EpisodeCreatePage } from './episode-create.page';

const routes: Routes = [
  {
    path: '',
    component: EpisodeCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EpisodeCreatePageRoutingModule {}
