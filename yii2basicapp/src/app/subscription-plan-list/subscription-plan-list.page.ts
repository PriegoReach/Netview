// src/app/subscription-plan-list/subscription-plan-list.page.ts

import { Component } from '@angular/core';
import { Router }    from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

import { SubscriptionPlanService } from '../services/subscription-plan.service';

@Component({
  selector:    'app-subscription-plan-list',
  templateUrl: './subscription-plan-list.page.html',
  styleUrls:   ['./subscription-plan-list.page.scss'],
  standalone:  false,
})
export class SubscriptionPlanListPage {

  items:     any[]  = [];
  busqueda:  string = '';
  total:     number = 0;
  page:      number = 1;
  porPagina: number = 5;

  constructor(
    private router:       Router,
    private loadingCtrl:  LoadingController,
    private alertCtrl:    AlertController,
    private planService:  SubscriptionPlanService,
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

    this.planService.listado(extra, this.busqueda).subscribe(
      (response) => {
        this.items = response;
        loading.dismiss();
      },
      (error) => {
        console.error('Error cargando planes:', error);
        loading.dismiss();
      },
    );
  }

  cargarTotal() {
    this.planService.total(this.busqueda).subscribe(
      (response) => { this.total = response; },
      (error)    => console.error('Error total:', error),
    );
  }

  // ── ELIMINAR (módulo 5) ───────────────────────────────────────────────

  async alertEliminar(id: number, nombre: string) {
    const alert = await this.alertCtrl.create({
      header:    'Plan',
      subHeader: 'Eliminar',
      message:   `¿Estás seguro de eliminar el plan "${nombre}"?`,
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
    this.planService.eliminar(id).subscribe(
      (response) => {
        if (response?.status === 204 || response?.status === 200) {
          this.alertEliminado(nombre, `El plan "${nombre}" ha sido eliminado.`);
        }
      },
      (error) => {
        if (error?.response?.status === 204) {
          this.alertEliminado(nombre, `El plan "${nombre}" ha sido eliminado.`);
          return;
        }
        if (error?.response?.status === 500) {
          this.alertEliminado(
            nombre,
            'No se puede eliminar este plan porque está siendo usado por suscripciones.',
            'Error',
          );
          return;
        }
        console.error('Error al eliminar:', error);
        this.alertEliminado(nombre, 'No se pudo eliminar el plan.', 'Error');
      },
    );
  }

  async alertEliminado(nombre: string, msg: string, subHeader: string = 'Eliminado') {
    const alert = await this.alertCtrl.create({
      header:    'Plan',
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
