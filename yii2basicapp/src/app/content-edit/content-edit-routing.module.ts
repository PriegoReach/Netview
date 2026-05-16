import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentEditPage } from './content-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ContentEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentEditPageRoutingModule {}
