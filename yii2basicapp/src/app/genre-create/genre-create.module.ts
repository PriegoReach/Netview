import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenreCreatePageRoutingModule } from './genre-create-routing.module';

import { GenreCreatePage } from './genre-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenreCreatePageRoutingModule
  ],
  declarations: [GenreCreatePage]
})
export class GenreCreatePageModule {}
