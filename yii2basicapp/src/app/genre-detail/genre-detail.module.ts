import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GenreDetailPageRoutingModule } from './genre-detail-routing.module';
import { GenreDetailPage } from './genre-detail.page';
import { GenreEditPageModule } from '../genre-edit/genre-edit.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenreDetailPageRoutingModule,
    GenreEditPageModule
  ],
  declarations: [GenreDetailPage]
})
export class GenreDetailPageModule {}
