// src/app/genre-list/genre-list.page.ts

import { Component } from '@angular/core';
import { Router }    from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

import { GenreService } from '../services/genre.service';

@Component({
  selector:    'app-genre-list',
  templateUrl: './genre-list.page.html',
  styleUrls:   ['./genre-list.page.scss'],
  standalone:  false,
})
export class GenreListPage {

  generos:   any[]  = [];
  busqueda:  string = '';
  total:     number = 0;
  page:      number = 1;
  porPagina: number = 5;

  constructor(
    private router:       Router,
    private loadingCtrl:  LoadingController,
    private alertCtrl:    AlertController,
    private genreService: GenreService,
  ) {}

  // ── Hooks ──────────────────────────────────────────────────────────────
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

  // ── Listado ────────────────────────────────────────────────────────────
  async cargarDatos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();

    const extra = `?page=${this.page}&per-page=${this.porPagina}`;

    this.genreService.listado(extra, this.busqueda).subscribe(
      (response) => {
        this.generos = response;
        loading.dismiss();
      },
      (error) => {
        console.error('Error cargando géneros:', error);
        loading.dismiss();
      },
    );
  }

  cargarTotal() {
    this.genreService.total(this.busqueda).subscribe(
      (response) => { this.total = response; },
      (error)    => console.error('Error total:', error),
    );
  }

  // ── ELIMINAR (módulo 5) ───────────────────────────────────────────────

  // 1. Pregunta de confirmación
  async alertEliminar(id: number, nombre: string) {
    const alert = await this.alertCtrl.create({
      header:    'Género',
      subHeader: 'Eliminar',
      message:   `¿Estás seguro de eliminar el género "${nombre}"?`,
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

  // 2. Ejecutar la eliminación
  eliminar(id: number, nombre: string) {
    this.genreService.eliminar(id).subscribe(
      (response) => {
        // El backend devuelve 204 cuando elimina correctamente
        if (response?.status === 204 || response?.status === 200) {
          this.alertEliminado(nombre, `El género "${nombre}" ha sido eliminado.`);
        }
      },
      (error) => {
        // Algunos backends devuelven 204 desde catch (axios lo trata diferente)
        if (error?.response?.status === 204) {
          this.alertEliminado(nombre, `El género "${nombre}" ha sido eliminado.`);
          return;
        }

        // Error de integridad referencial (género en uso)
        if (error?.response?.status === 500) {
          this.alertEliminado(
            nombre,
            'No se puede eliminar este género porque está siendo usado por contenidos.',
            'Error',
          );
          return;
        }

        console.error('Error al eliminar:', error);
        this.alertEliminado(nombre, 'No se pudo eliminar el género.', 'Error');
      },
    );
  }

  // 3. Mensaje post-eliminación
  async alertEliminado(nombre: string, msg: string, subHeader: string = 'Eliminado') {
    const alert = await this.alertCtrl.create({
      header:    'Género',
      subHeader,
      message:   msg,
      cssClass:  'alert-center',
      buttons: [
        {
          text: 'Continuar',
          role: 'cancel',
          handler: () => {
            // Refresca el listado sin recargar la página
            this.cargarTotal();
            this.cargarDatos();
          },
        },
      ],
    });
    await alert.present();
  }
}