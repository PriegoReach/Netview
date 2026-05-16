import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LanguageDetailPage } from './language-detail.page';

const routes: Routes = [
  {
    path: '',
    component: LanguageDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LanguageDetailPageRoutingModule {}
