// src/app/content-edit/content-edit.module.ts

import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule }                      from '@ionic/angular';

import { ContentEditPageRoutingModule } from './content-edit-routing.module';
import { ContentEditPage }              from './content-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ContentEditPageRoutingModule,
  ],
  declarations: [ContentEditPage],
})
export class ContentEditPageModule {}