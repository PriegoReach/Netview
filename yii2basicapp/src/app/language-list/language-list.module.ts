import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LanguageListPageRoutingModule } from './language-list-routing.module';
import { LanguageListPage } from './language-list.page';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LanguageListPageRoutingModule,
    PaginacionModule
  ],
  declarations: [LanguageListPage]
})
export class LanguageListPageModule {}
