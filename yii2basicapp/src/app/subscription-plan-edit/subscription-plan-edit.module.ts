import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SubscriptionPlanEditPageRoutingModule } from './subscription-plan-edit-routing.module';
import { SubscriptionPlanEditPage } from './subscription-plan-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscriptionPlanEditPageRoutingModule
  ],
  declarations: [SubscriptionPlanEditPage]
})
export class SubscriptionPlanEditPageModule {}
