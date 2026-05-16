import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfileDetailPageRoutingModule } from './profile-detail-routing.module';
import { ProfileDetailPage } from './profile-detail.page';
import { ProfileEditPageModule } from '../profile-edit/profile-edit.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileDetailPageRoutingModule,
    ProfileEditPageModule
  ],
  declarations: [ProfileDetailPage]
})
export class ProfileDetailPageModule {}
