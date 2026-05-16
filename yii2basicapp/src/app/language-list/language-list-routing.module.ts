import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LanguageListPage } from './language-list.page';

const routes: Routes = [
  {
    path: '',
    component: LanguageListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LanguageListPageRoutingModule {}
