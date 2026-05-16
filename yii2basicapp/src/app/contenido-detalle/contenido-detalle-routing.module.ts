import { NgModule }              from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';
import { ContenidoDetallePage }   from './contenido-detalle.page';

const routes: Routes = [
  {
    path:      '',
    component: ContenidoDetallePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContenidoDetallePageRoutingModule {}