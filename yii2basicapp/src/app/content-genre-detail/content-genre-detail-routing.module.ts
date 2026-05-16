import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentGenreDetailPage } from './content-genre-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ContentGenreDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentGenreDetailPageRoutingModule {}
