import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenreListPage } from './genre-list.page';

const routes: Routes = [
  {
    path: '',
    component: GenreListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenreListPageRoutingModule {}
