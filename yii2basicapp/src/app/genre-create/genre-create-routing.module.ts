import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenreCreatePage } from './genre-create.page';

const routes: Routes = [
  {
    path: '',
    component: GenreCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenreCreatePageRoutingModule {}
