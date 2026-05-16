import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GenreListPageRoutingModule } from './genre-list-routing.module';
import { GenreListPage } from './genre-list.page';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenreListPageRoutingModule,
    PaginacionModule
  ],
  declarations: [GenreListPage]
})
export class GenreListPageModule {}
