import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RatingEditPage } from './rating-edit.page';

const routes: Routes = [
  {
    path: '',
    component: RatingEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RatingEditPageRoutingModule {}
