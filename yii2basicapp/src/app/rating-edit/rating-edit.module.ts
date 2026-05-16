import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RatingEditPageRoutingModule } from './rating-edit-routing.module';
import { RatingEditPage } from './rating-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RatingEditPageRoutingModule
  ],
  declarations: [RatingEditPage]
})
export class RatingEditPageModule {}
