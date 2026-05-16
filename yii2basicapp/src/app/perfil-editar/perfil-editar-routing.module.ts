// src/app/perfil-editar/perfil-editar-routing.module.ts

import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilEditarPage }     from './perfil-editar.page';

const routes: Routes = [
  { path: '', component: PerfilEditarPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilEditarPageRoutingModule {}
