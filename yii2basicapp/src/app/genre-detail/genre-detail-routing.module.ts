import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenreDetailPage } from './genre-detail.page';

const routes: Routes = [
  {
    path: '',
    component: GenreDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenreDetailPageRoutingModule {}
