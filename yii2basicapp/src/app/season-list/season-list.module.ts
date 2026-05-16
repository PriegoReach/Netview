import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SeasonListPageRoutingModule } from './season-list-routing.module';
import { SeasonListPage } from './season-list.page';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeasonListPageRoutingModule,
    PaginacionModule
  ],
  declarations: [SeasonListPage]
})
export class SeasonListPageModule {}
