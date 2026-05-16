import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EpisodeDetailPageRoutingModule } from './episode-detail-routing.module';
import { EpisodeDetailPage } from './episode-detail.page';
import { EpisodeEditPageModule } from '../episode-edit/episode-edit.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EpisodeDetailPageRoutingModule,
    EpisodeEditPageModule
  ],
  declarations: [EpisodeDetailPage]
})
export class EpisodeDetailPageModule {}
