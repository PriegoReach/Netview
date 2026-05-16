import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SubscriptionPlanDetailPageRoutingModule } from './subscription-plan-detail-routing.module';
import { SubscriptionPlanDetailPage } from './subscription-plan-detail.page';
import { SubscriptionPlanEditPageModule } from '../subscription-plan-edit/subscription-plan-edit.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscriptionPlanDetailPageRoutingModule,
    SubscriptionPlanEditPageModule
  ],
  declarations: [SubscriptionPlanDetailPage]
})
export class SubscriptionPlanDetailPageModule {}
