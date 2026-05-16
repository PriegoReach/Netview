import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentLanguageDetailPage } from './content-language-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ContentLanguageDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentLanguageDetailPageRoutingModule {}
