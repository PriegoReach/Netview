import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContentGenreListPageRoutingModule } from './content-genre-list-routing.module';

import { ContentGenreListPage } from './content-genre-list.page';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentGenreListPageRoutingModule,
    PaginacionModule
  ],
  declarations: [ContentGenreListPage]
})
export class ContentGenreListPageModule {}
