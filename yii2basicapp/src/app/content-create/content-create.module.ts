// src/app/content-create/content-create.module.ts

import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule }                      from '@ionic/angular';

import { ContentCreatePageRoutingModule } from './content-create-routing.module';
import { ContentCreatePage }              from './content-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ContentCreatePageRoutingModule,
  ],
  declarations: [ContentCreatePage],
})
export class ContentCreatePageModule {}