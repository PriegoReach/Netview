import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SubscriptionEditPageRoutingModule } from './subscription-edit-routing.module';
import { SubscriptionEditPage } from './subscription-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscriptionEditPageRoutingModule
  ],
  declarations: [SubscriptionEditPage]
})
export class SubscriptionEditPageModule {}
