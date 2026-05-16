// src/app/watch-history-list/watch-history-list.page.ts

import { Component } from '@angular/core';
import { Router }    from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

import { WatchHistoryService } from '../services/watch-history.service';

@Component({
  selector:    'app-watch-history-list',
  templateUrl: './watch-history-list.page.html',
  styleUrls:   ['./watch-history-list.page.scss'],
  standalone:  false,
})
export class WatchHistoryListPage {

  items:     any[]  = [];
  busqueda:  string = '';
  total:     number = 0;
  page:      number = 1;
  porPagina: number = 5;

  constructor(
    private router:              Router,
    private loadingCtrl:         LoadingController,
    private alertCtrl:           AlertController,
    private whService:           WatchHistoryService,
  ) {}

  ionViewWillEnter() {
    this.cargarTotal();
    this.cargarDatos();
  }

  handleInput(event: any) {
    this.busqueda = (event.target.value ?? '').toLowerCase();
    this.page = 1;
    this.cargarDatos();
  }

  pagina(event: any) {
    this.page = event.target.innerText;
    this.cargarDatos();
  }

  async cargarDatos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();

    const extra = `?page=${this.page}&per-page=${this.porPagina}`;

    this.whService.listado(extra, this.busqueda).subscribe(
      (response) => {
        this.items = response;
        loading.dismiss();
      },
      (error) => {
        console.error('Error cargando historial:', error);
        loading.dismiss();
      },
    );
  }

  cargarTotal() {
    this.whService.total(this.busqueda).subscribe(
      (response) => { this.total = response; },
      (error)    => console.error('Error total:', error),
    );
  }

  // ── ELIMINAR (módulo 5) ───────────────────────────────────────────────

  async alertEliminar(id: number, nombre: string) {
    const alert = await this.alertCtrl.create({
      header:    'Historial',
      subHeader: 'Eliminar',
      message:   `¿Estás seguro de eliminar el registro "${nombre}"?`,
      cssClass:  'alert-center',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text:    'Confirmar',
          role:    'confirm',
          handler: () => this.eliminar(id, nombre),
        },
      ],
    });
    await alert.present();
  }

  eliminar(id: number, nombre: string) {
    this.whService.eliminar(id).subscribe(
      (response) => {
        if (response?.status === 204 || response?.status === 200) {
          this.alertEliminado(nombre, `El registro "${nombre}" ha sido eliminado.`);
        }
      },
      (error) => {
        if (error?.response?.status === 204) {
          this.alertEliminado(nombre, `El registro "${nombre}" ha sido eliminado.`);
          return;
        }
        if (error?.response?.status === 500) {
          this.alertEliminado(
            nombre,
            'No se puede eliminar este registro porque está siendo usado.',
            'Error',
          );
          return;
        }
        console.error('Error al eliminar:', error);
        this.alertEliminado(nombre, 'No se pudo eliminar el registro.', 'Error');
      },
    );
  }

  async alertEliminado(nombre: string, msg: string, subHeader: string = 'Eliminado') {
    const alert = await this.alertCtrl.create({
      header:    'Historial',
      subHeader,
      message:   msg,
      cssClass:  'alert-center',
      buttons: [
        {
          text: 'Continuar',
          role: 'cancel',
          handler: () => {
            this.cargarTotal();
            this.cargarDatos();
          },
        },
      ],
    });
    await alert.present();
  }
}
