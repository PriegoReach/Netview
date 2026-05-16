import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentGenreListPage } from './content-genre-list.page';

const routes: Routes = [
  {
    path: '',
    component: ContentGenreListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentGenreListPageRoutingModule {}
