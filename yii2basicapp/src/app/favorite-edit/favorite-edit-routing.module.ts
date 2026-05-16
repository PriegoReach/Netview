import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoriteEditPage } from './favorite-edit.page';

const routes: Routes = [
  {
    path: '',
    component: FavoriteEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoriteEditPageRoutingModule {}
