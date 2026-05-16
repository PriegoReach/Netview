import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LanguageEditPageRoutingModule } from './language-edit-routing.module';
import { LanguageEditPage } from './language-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LanguageEditPageRoutingModule
  ],
  declarations: [LanguageEditPage]
})
export class LanguageEditPageModule {}
