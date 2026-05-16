import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LanguageCreatePageRoutingModule } from './language-create-routing.module';
import { LanguageCreatePage } from './language-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LanguageCreatePageRoutingModule
  ],
  declarations: [LanguageCreatePage]
})
export class LanguageCreatePageModule {}
