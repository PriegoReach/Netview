import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContentGenreDetailPageRoutingModule } from './content-genre-detail-routing.module';
import { ContentGenreDetailPage } from './content-genre-detail.page';
import { ContentGenreEditPageModule } from '../content-genre-edit/content-genre-edit.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentGenreDetailPageRoutingModule,
    ContentGenreEditPageModule
  ],
  declarations: [ContentGenreDetailPage]
})
export class ContentGenreDetailPageModule {}
