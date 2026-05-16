import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EpisodeCreatePageRoutingModule } from './episode-create-routing.module';
import { EpisodeCreatePage } from './episode-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EpisodeCreatePageRoutingModule
  ],
  declarations: [EpisodeCreatePage]
})
export class EpisodeCreatePageModule {}
