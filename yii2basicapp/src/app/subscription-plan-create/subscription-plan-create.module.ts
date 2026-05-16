import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SubscriptionPlanCreatePageRoutingModule } from './subscription-plan-create-routing.module';
import { SubscriptionPlanCreatePage } from './subscription-plan-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscriptionPlanCreatePageRoutingModule
  ],
  declarations: [SubscriptionPlanCreatePage]
})
export class SubscriptionPlanCreatePageModule {}
