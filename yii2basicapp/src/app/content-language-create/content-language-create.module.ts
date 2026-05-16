import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContentLanguageCreatePageRoutingModule } from './content-language-create-routing.module';
import { ContentLanguageCreatePage } from './content-language-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentLanguageCreatePageRoutingModule
  ],
  declarations: [ContentLanguageCreatePage]
})
export class ContentLanguageCreatePageModule {}
