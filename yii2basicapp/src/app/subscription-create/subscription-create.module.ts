import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SubscriptionCreatePageRoutingModule } from './subscription-create-routing.module';
import { SubscriptionCreatePage } from './subscription-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscriptionCreatePageRoutingModule
  ],
  declarations: [SubscriptionCreatePage]
})
export class SubscriptionCreatePageModule {}
