// src/app/content-genre-list/content-genre-list.page.ts

import { Component } from '@angular/core';
import { Router }    from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

import { ContentGenreService } from '../services/content-genre.service';

@Component({
  selector:    'app-content-genre-list',
  templateUrl: './content-genre-list.page.html',
  styleUrls:   ['./content-genre-list.page.scss'],
  standalone:  false,
})
export class ContentGenreListPage {

  items:     any[]  = [];
  busqueda:  string = '';
  total:     number = 0;
  page:      number = 1;
  porPagina: number = 5;

  constructor(
    private router:     Router,
    private loadingCtrl: LoadingController,
    private alertCtrl:   AlertController,
    private cgService:   ContentGenreService,
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

    this.cgService.listado(extra, this.busqueda).subscribe(
      (response) => {
        this.items = response;
        loading.dismiss();
      },
      (error) => {
        console.error('Error cargando content-genre:', error);
        loading.dismiss();
      },
    );
  }

  cargarTotal() {
    this.cgService.total(this.busqueda).subscribe(
      (response) => { this.total = response; },
      (error)    => console.error('Error total:', error),
    );
  }

  // ── ELIMINAR (módulo 5) — clave compuesta ─────────────────────────────

  async alertEliminar(contentId: number, genreId: number, descripcion: string) {
    const alert = await this.alertCtrl.create({
      header:    'Content-Genre',
      subHeader: 'Eliminar',
      message:   `¿Estás seguro de eliminar la relación "${descripcion}"?`,
      cssClass:  'alert-center',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text:    'Confirmar',
          role:    'confirm',
          handler: () => this.eliminar(contentId, genreId, descripcion),
        },
      ],
    });
    await alert.present();
  }

  eliminar(contentId: number, genreId: number, descripcion: string) {
    this.cgService.eliminar(contentId, genreId).subscribe(
      (response) => {
        if (response?.status === 204 || response?.status === 200) {
          this.alertEliminado(descripcion, `La relación "${descripcion}" ha sido eliminada.`);
        }
      },
      (error) => {
        if (error?.response?.status === 204) {
          this.alertEliminado(descripcion, `La relación "${descripcion}" ha sido eliminada.`);
          return;
        }
        if (error?.response?.status === 500) {
          this.alertEliminado(
            descripcion,
            'No se puede eliminar esta relación porque está siendo usada.',
            'Error',
          );
          return;
        }
        console.error('Error al eliminar:', error);
        this.alertEliminado(descripcion, 'No se pudo eliminar la relación.', 'Error');
      },
    );
  }

  async alertEliminado(descripcion: string, msg: string, subHeader: string = 'Eliminado') {
    const alert = await this.alertCtrl.create({
      header:    'Content-Genre',
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
