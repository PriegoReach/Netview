import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EpisodeEditPageRoutingModule } from './episode-edit-routing.module';
import { EpisodeEditPage } from './episode-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EpisodeEditPageRoutingModule
  ],
  declarations: [EpisodeEditPage]
})
export class EpisodeEditPageModule {}
