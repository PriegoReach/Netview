// src/app/favorite-list/favorite-list.page.ts

import { Component } from '@angular/core';
import { Router }    from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

import { FavoriteService } from '../services/favorite.service';

@Component({
  selector:    'app-favorite-list',
  templateUrl: './favorite-list.page.html',
  styleUrls:   ['./favorite-list.page.scss'],
  standalone:  false,
})
export class FavoriteListPage {

  items:     any[]  = [];
  busqueda:  string = '';
  total:     number = 0;
  page:      number = 1;
  porPagina: number = 5;

  constructor(
    private router:          Router,
    private loadingCtrl:     LoadingController,
    private alertCtrl:       AlertController,
    private favoriteService: FavoriteService,
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

    this.favoriteService.listado(extra, this.busqueda).subscribe(
      (response) => {
        this.items = response;
        loading.dismiss();
      },
      (error) => {
        console.error('Error cargando favoritos:', error);
        loading.dismiss();
      },
    );
  }

  cargarTotal() {
    this.favoriteService.total(this.busqueda).subscribe(
      (response) => { this.total = response; },
      (error)    => console.error('Error total:', error),
    );
  }

  // ── ELIMINAR (módulo 5) — clave compuesta ─────────────────────────────

  async alertEliminar(profileId: number, contentId: number, descripcion: string) {
    const alert = await this.alertCtrl.create({
      header:    'Favorito',
      subHeader: 'Eliminar',
      message:   `¿Estás seguro de eliminar el favorito "${descripcion}"?`,
      cssClass:  'alert-center',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text:    'Confirmar',
          role:    'confirm',
          handler: () => this.eliminar(profileId, contentId, descripcion),
        },
      ],
    });
    await alert.present();
  }

  eliminar(profileId: number, contentId: number, descripcion: string) {
    this.favoriteService.eliminar(profileId, contentId).subscribe(
      (response) => {
        if (response?.status === 204 || response?.status === 200) {
          this.alertEliminado(descripcion, `El favorito "${descripcion}" ha sido eliminado.`);
        }
      },
      (error) => {
        if (error?.response?.status === 204) {
          this.alertEliminado(descripcion, `El favorito "${descripcion}" ha sido eliminado.`);
          return;
        }
        if (error?.response?.status === 500) {
          this.alertEliminado(
            descripcion,
            'No se puede eliminar este favorito porque está siendo usado.',
            'Error',
          );
          return;
        }
        console.error('Error al eliminar:', error);
        this.alertEliminado(descripcion, 'No se pudo eliminar el favorito.', 'Error');
      },
    );
  }

  async alertEliminado(descripcion: string, msg: string, subHeader: string = 'Eliminado') {
    const alert = await this.alertCtrl.create({
      header:    'Favorito',
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
