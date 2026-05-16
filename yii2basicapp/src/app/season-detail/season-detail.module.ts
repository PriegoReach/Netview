import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SeasonDetailPageRoutingModule } from './season-detail-routing.module';
import { SeasonDetailPage } from './season-detail.page';
import { SeasonEditPageModule } from '../season-edit/season-edit.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeasonDetailPageRoutingModule,
    SeasonEditPageModule
  ],
  declarations: [SeasonDetailPage]
})
export class SeasonDetailPageModule {}
