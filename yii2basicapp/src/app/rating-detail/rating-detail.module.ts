import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RatingDetailPageRoutingModule } from './rating-detail-routing.module';
import { RatingDetailPage } from './rating-detail.page';
import { RatingEditPageModule } from '../rating-edit/rating-edit.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RatingDetailPageRoutingModule,
    RatingEditPageModule
  ],
  declarations: [RatingDetailPage]
})
export class RatingDetailPageModule {}
