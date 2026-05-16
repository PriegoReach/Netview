import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SeasonEditPageRoutingModule } from './season-edit-routing.module';
import { SeasonEditPage } from './season-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeasonEditPageRoutingModule
  ],
  declarations: [SeasonEditPage]
})
export class SeasonEditPageModule {}
