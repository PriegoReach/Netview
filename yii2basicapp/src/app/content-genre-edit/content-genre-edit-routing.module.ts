import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentGenreEditPage } from './content-genre-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ContentGenreEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentGenreEditPageRoutingModule {}
