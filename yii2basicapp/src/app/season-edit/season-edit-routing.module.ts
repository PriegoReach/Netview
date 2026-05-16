import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeasonEditPage } from './season-edit.page';

const routes: Routes = [
  {
    path: '',
    component: SeasonEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeasonEditPageRoutingModule {}
