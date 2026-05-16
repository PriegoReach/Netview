import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentLanguageListPage } from './content-language-list.page';

const routes: Routes = [
  {
    path: '',
    component: ContentLanguageListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentLanguageListPageRoutingModule {}
