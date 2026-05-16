import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EpisodeListPageRoutingModule } from './episode-list-routing.module';
import { EpisodeListPage } from './episode-list.page';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EpisodeListPageRoutingModule,
    PaginacionModule
  ],
  declarations: [EpisodeListPage]
})
export class EpisodeListPageModule {}
