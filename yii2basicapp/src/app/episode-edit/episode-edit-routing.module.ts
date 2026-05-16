import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EpisodeEditPage } from './episode-edit.page';

const routes: Routes = [
  {
    path: '',
    component: EpisodeEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EpisodeEditPageRoutingModule {}
