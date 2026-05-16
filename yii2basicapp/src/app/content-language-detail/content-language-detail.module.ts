import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContentLanguageDetailPageRoutingModule } from './content-language-detail-routing.module';
import { ContentLanguageDetailPage } from './content-language-detail.page';
import { ContentLanguageEditPageModule } from '../content-language-edit/content-language-edit.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentLanguageDetailPageRoutingModule,
    ContentLanguageEditPageModule
  ],
  declarations: [ContentLanguageDetailPage]
})
export class ContentLanguageDetailPageModule {}
