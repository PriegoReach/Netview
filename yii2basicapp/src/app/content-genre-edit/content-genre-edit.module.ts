import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContentGenreEditPageRoutingModule } from './content-genre-edit-routing.module';

import { ContentGenreEditPage } from './content-genre-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentGenreEditPageRoutingModule
  ],
  declarations: [ContentGenreEditPage]
})
export class ContentGenreEditPageModule {}
