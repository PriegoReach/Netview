import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WatchHistoryListPageRoutingModule } from './watch-history-list-routing.module';
import { WatchHistoryListPage } from './watch-history-list.page';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WatchHistoryListPageRoutingModule,
    PaginacionModule
  ],
  declarations: [WatchHistoryListPage]
})
export class WatchHistoryListPageModule {}
