import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FavoriteEditPageRoutingModule } from './favorite-edit-routing.module';
import { FavoriteEditPage } from './favorite-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoriteEditPageRoutingModule
  ],
  declarations: [FavoriteEditPage]
})
export class FavoriteEditPageModule {}
