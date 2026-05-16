import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentGenreCreatePage } from './content-genre-create.page';

const routes: Routes = [
  {
    path: '',
    component: ContentGenreCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentGenreCreatePageRoutingModule {}
