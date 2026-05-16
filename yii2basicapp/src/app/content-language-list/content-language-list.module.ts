import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContentLanguageListPageRoutingModule } from './content-language-list-routing.module';
import { ContentLanguageListPage } from './content-language-list.page';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentLanguageListPageRoutingModule,
    PaginacionModule
  ],
  declarations: [ContentLanguageListPage]
})
export class ContentLanguageListPageModule {}
