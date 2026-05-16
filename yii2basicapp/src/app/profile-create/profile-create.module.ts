import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfileCreatePageRoutingModule } from './profile-create-routing.module';
import { ProfileCreatePage } from './profile-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileCreatePageRoutingModule
  ],
  declarations: [ProfileCreatePage]
})
export class ProfileCreatePageModule {}
