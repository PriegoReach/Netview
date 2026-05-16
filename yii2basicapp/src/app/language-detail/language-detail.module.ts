import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LanguageDetailPageRoutingModule } from './language-detail-routing.module';
import { LanguageDetailPage } from './language-detail.page';
import { LanguageEditPageModule } from '../language-edit/language-edit.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LanguageDetailPageRoutingModule,
    LanguageEditPageModule
  ],
  declarations: [LanguageDetailPage]
})
export class LanguageDetailPageModule {}
