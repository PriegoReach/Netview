import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SubscriptionPlanListPageRoutingModule } from './subscription-plan-list-routing.module';
import { SubscriptionPlanListPage } from './subscription-plan-list.page';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubscriptionPlanListPageRoutingModule,
    PaginacionModule
  ],
  declarations: [SubscriptionPlanListPage]
})
export class SubscriptionPlanListPageModule {}
