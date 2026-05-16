import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SeasonCreatePageRoutingModule } from './season-create-routing.module';
import { SeasonCreatePage } from './season-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeasonCreatePageRoutingModule
  ],
  declarations: [SeasonCreatePage]
})
export class SeasonCreatePageModule {}
