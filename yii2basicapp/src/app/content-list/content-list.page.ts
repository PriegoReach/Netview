// src/app/content-list/content-list.page.ts

import { Component } from '@angular/core';
import { Router }    from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

import { ContentService } from '../services/content.service';

@Component({
  selector:    'app-content-list',
  templateUrl: './content-list.page.html',
  styleUrls:   ['./content-list.page.scss'],
  standalone:  false,
})
export class ContentListPage {

  items:     any[]  = [];
  busqueda:  string = '';
  total:     number = 0;
  page:      number = 1;
  porPagina: number = 5;

  constructor(
    private router:         Router,
    private loadingCtrl:    LoadingController,
    private alertCtrl:      AlertController,
    private contentService: ContentService,
  ) {}

  ionViewWillEnter() {
    this.cargarTotal();
    this.cargarDatos();
  }

  /**
   * Simbología de tipo de contenido (Manual de Identidad):
   * mapea content_type a la clase de insignia serie / kids / película.
   */
  tipoBadgeClass(tipo: string): string {
    const t = (tipo || '').toLowerCase();
    if (t.includes('serie')) { return 'nv-badge--serie'; }
    if (t.includes('kid') || t.includes('infantil')) { return 'nv-badge--kids'; }
    return 'nv-badge--pelicula';
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

    this.contentService.listado(extra, this.busqueda).subscribe(
      (response) => {
        this.items = response;
        loading.dismiss();
      },
      (error) => {
        console.error('Error cargando contenidos:', error);
        loading.dismiss();
      },
    );
  }

  cargarTotal() {
    this.contentService.total(this.busqueda).subscribe(
      (response) => { this.total = response; },
      (error)    => console.error('Error total:', error),
    );
  }

  // ── ELIMINAR (módulo 5) ───────────────────────────────────────────────

  async alertEliminar(id: number, nombre: string) {
    const alert = await this.alertCtrl.create({
      header:    'Contenido',
      subHeader: 'Eliminar',
      message:   `¿Estás seguro de eliminar el contenido "${nombre}"?`,
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
    this.contentService.eliminar(id).subscribe(
      (response) => {
        if (response?.status === 204 || response?.status === 200) {
          this.alertEliminado(nombre, `El contenido "${nombre}" ha sido eliminado.`);
        }
      },
      (error) => {
        if (error?.response?.status === 204) {
          this.alertEliminado(nombre, `El contenido "${nombre}" ha sido eliminado.`);
          return;
        }
        if (error?.response?.status === 500) {
          this.alertEliminado(
            nombre,
            'No se puede eliminar este contenido porque está siendo usado.',
            'Error',
          );
          return;
        }
        console.error('Error al eliminar:', error);
        this.alertEliminado(nombre, 'No se pudo eliminar el contenido.', 'Error');
      },
    );
  }

  async alertEliminado(nombre: string, msg: string, subHeader: string = 'Eliminado') {
    const alert = await this.alertCtrl.create({
      header:    'Contenido',
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
