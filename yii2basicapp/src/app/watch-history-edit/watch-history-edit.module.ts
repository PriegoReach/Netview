import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WatchHistoryEditPageRoutingModule } from './watch-history-edit-routing.module';
import { WatchHistoryEditPage } from './watch-history-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WatchHistoryEditPageRoutingModule
  ],
  declarations: [WatchHistoryEditPage]
})
export class WatchHistoryEditPageModule {}
