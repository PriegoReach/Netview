import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfileListPageRoutingModule } from './profile-list-routing.module';
import { ProfileListPage } from './profile-list.page';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileListPageRoutingModule,
    PaginacionModule
  ],
  declarations: [ProfileListPage]
})
export class ProfileListPageModule {}
