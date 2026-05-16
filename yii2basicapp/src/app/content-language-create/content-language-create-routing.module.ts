import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentLanguageCreatePage } from './content-language-create.page';

const routes: Routes = [
  {
    path: '',
    component: ContentLanguageCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentLanguageCreatePageRoutingModule {}
