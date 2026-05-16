import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenreEditPage } from './genre-edit.page';

const routes: Routes = [
  {
    path: '',
    component: GenreEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenreEditPageRoutingModule {}
