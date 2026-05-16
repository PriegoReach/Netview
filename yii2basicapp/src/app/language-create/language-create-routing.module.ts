import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LanguageCreatePage } from './language-create.page';

const routes: Routes = [
  {
    path: '',
    component: LanguageCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LanguageCreatePageRoutingModule {}
