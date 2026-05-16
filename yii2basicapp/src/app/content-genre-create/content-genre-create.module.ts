import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContentGenreCreatePageRoutingModule } from './content-genre-create-routing.module';

import { ContentGenreCreatePage } from './content-genre-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentGenreCreatePageRoutingModule
  ],
  declarations: [ContentGenreCreatePage]
})
export class ContentGenreCreatePageModule {}
