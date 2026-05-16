import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WatchHistoryDetailPageRoutingModule } from './watch-history-detail-routing.module';
import { WatchHistoryDetailPage } from './watch-history-detail.page';
import { WatchHistoryEditPageModule } from '../watch-history-edit/watch-history-edit.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WatchHistoryDetailPageRoutingModule,
    WatchHistoryEditPageModule
  ],
  declarations: [WatchHistoryDetailPage]
})
export class WatchHistoryDetailPageModule {}
