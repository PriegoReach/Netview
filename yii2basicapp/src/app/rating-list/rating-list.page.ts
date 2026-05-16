// src/app/rating-list/rating-list.page.ts

import { Component } from '@angular/core';
import { Router }    from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

import { RatingService } from '../services/rating.service';

@Component({
  selector:    'app-rating-list',
  templateUrl: './rating-list.page.html',
  styleUrls:   ['./rating-list.page.scss'],
  standalone:  false,
})
export class RatingListPage {

  items:     any[]  = [];
  busqueda:  string = '';
  total:     number = 0;
  page:      number = 1;
  porPagina: number = 5;

  constructor(
    private router:        Router,
    private loadingCtrl:   LoadingController,
    private alertCtrl:     AlertController,
    private ratingService: RatingService,
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

    this.ratingService.listado(extra, this.busqueda).subscribe(
      (response) => {
        this.items = response;
        loading.dismiss();
      },
      (error) => {
        console.error('Error cargando valoraciones:', error);
        loading.dismiss();
      },
    );
  }

  cargarTotal() {
    this.ratingService.total(this.busqueda).subscribe(
      (response) => { this.total = response; },
      (error)    => console.error('Error total:', error),
    );
  }

  // ── ELIMINAR (módulo 5) ───────────────────────────────────────────────

  async alertEliminar(id: number, nombre: string) {
    const alert = await this.alertCtrl.create({
      header:    'Valoración',
      subHeader: 'Eliminar',
      message:   `¿Estás seguro de eliminar la valoración "${nombre}"?`,
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
    this.ratingService.eliminar(id).subscribe(
      (response) => {
        if (response?.status === 204 || response?.status === 200) {
          this.alertEliminado(nombre, `La valoración "${nombre}" ha sido eliminada.`);
        }
      },
      (error) => {
        if (error?.response?.status === 204) {
          this.alertEliminado(nombre, `La valoración "${nombre}" ha sido eliminada.`);
          return;
        }
        if (error?.response?.status === 500) {
          this.alertEliminado(
            nombre,
            'No se puede eliminar esta valoración porque está siendo usada.',
            'Error',
          );
          return;
        }
        console.error('Error al eliminar:', error);
        this.alertEliminado(nombre, 'No se pudo eliminar la valoración.', 'Error');
      },
    );
  }

  async alertEliminado(nombre: string, msg: string, subHeader: string = 'Eliminado') {
    const alert = await this.alertCtrl.create({
      header:    'Valoración',
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
