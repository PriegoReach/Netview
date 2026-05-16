// src/app/perfil-editar/perfil-editar.module.ts

import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule }                      from '@ionic/angular';

import { PerfilEditarPageRoutingModule } from './perfil-editar-routing.module';
import { PerfilEditarPage }              from './perfil-editar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PerfilEditarPageRoutingModule,
  ],
  declarations: [PerfilEditarPage],
})
export class PerfilEditarPageModule {}
