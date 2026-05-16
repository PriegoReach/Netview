import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoriteCreatePage } from './favorite-create.page';

const routes: Routes = [
  {
    path: '',
    component: FavoriteCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoriteCreatePageRoutingModule {}
