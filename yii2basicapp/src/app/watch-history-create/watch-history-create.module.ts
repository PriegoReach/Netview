import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WatchHistoryCreatePageRoutingModule } from './watch-history-create-routing.module';
import { WatchHistoryCreatePage } from './watch-history-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WatchHistoryCreatePageRoutingModule
  ],
  declarations: [WatchHistoryCreatePage]
})
export class WatchHistoryCreatePageModule {}
