import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FavoriteDetailPageRoutingModule } from './favorite-detail-routing.module';
import { FavoriteDetailPage } from './favorite-detail.page';
import { FavoriteEditPageModule } from '../favorite-edit/favorite-edit.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoriteDetailPageRoutingModule,
    FavoriteEditPageModule
  ],
  declarations: [FavoriteDetailPage]
})
export class FavoriteDetailPageModule {}
