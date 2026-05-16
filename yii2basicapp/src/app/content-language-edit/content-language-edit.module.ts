import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContentLanguageEditPageRoutingModule } from './content-language-edit-routing.module';
import { ContentLanguageEditPage } from './content-language-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentLanguageEditPageRoutingModule
  ],
  declarations: [ContentLanguageEditPage]
})
export class ContentLanguageEditPageModule {}
