import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenreEditPageRoutingModule } from './genre-edit-routing.module';

import { GenreEditPage } from './genre-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenreEditPageRoutingModule
  ],
  declarations: [GenreEditPage]
})
export class GenreEditPageModule {}
