import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeasonCreatePage } from './season-create.page';

const routes: Routes = [
  {
    path: '',
    component: SeasonCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeasonCreatePageRoutingModule {}
