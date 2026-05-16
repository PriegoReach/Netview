import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContentListPageRoutingModule } from './content-list-routing.module';
import { ContentListPage } from './content-list.page';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContentListPageRoutingModule,
    PaginacionModule
  ],
  declarations: [ContentListPage]
})
export class ContentListPageModule {}
