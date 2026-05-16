import { NgModule }                  from '@angular/core';
import { CommonModule }              from '@angular/common';
import { FormsModule }               from '@angular/forms';
import { IonicModule }               from '@ionic/angular';
import { ContenidoDetallePageRoutingModule } from './contenido-detalle-routing.module';
import { ContenidoDetallePage }      from './contenido-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContenidoDetallePageRoutingModule,
  ],
  declarations: [ContenidoDetallePage],
})
export class ContenidoDetallePageModule {}