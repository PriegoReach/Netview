// src/app/favoritos/favoritos.page.ts

import { Component, OnInit }                  from '@angular/core';
import { Router }                             from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import axios                                  from 'axios';

import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

interface Favorito {
  id:            number;
  titulo:        string;
  imagen:        string;
  anio:          number;
  clasificacion: string;
  calificacion:  number;
}

@Component({
  selector:    'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls:   ['./favoritos.page.scss'],
  standalone:  false,
})
export class FavoritosPage implements OnInit {

  favoritos: Favorito[] = [];
  cargando:  boolean    = false;

  private baseUrl = environment.apiUrl;

  constructor(
    private router:      Router,
    private alertCtrl:   AlertController,
    private loadingCtrl: LoadingController,
    private auth:        AuthService,
  ) {}

  ngOnInit() {
    this.cargarFavoritos();
  }

  ionViewWillEnter() {
    this.cargarFavoritos();
  }

  async cargarFavoritos() {
    this.cargando = true;
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();

    try {
      const response = await axios({
        method:  'get',
        url:     `${this.baseUrl}/usuario/favoritos`,
        headers: this.auth.authHeaders(),
      });
      this.favoritos = response.data;
    } catch (error) {
      console.error('Error cargando favoritos:', error);
      this.favoritos = [];
    } finally {
      this.cargando = false;
      loading.dismiss();
    }
  }

  verDetalle(id: number) {
    this.router.navigate(['/contenido', id]);
  }

  async quitarFavorito(id: number, titulo: string) {
    const alert = await this.alertCtrl.create({
      header:    'Favoritos',
      subHeader: 'Quitar',
      message:   `¿Quitar "${titulo}" de tus favoritos?`,
      cssClass:  'alert-center',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text:    'Quitar',
          role:    'destructive',
          handler: () => this.ejecutarQuitar(id),
        },
      ],
    });
    await alert.present();
  }

  private async ejecutarQuitar(id: number) {
    try {
      await axios({
        method:  'delete',
        url:     `${this.baseUrl}/usuario/favoritos/${id}`,
        headers: this.auth.authHeaders(),
      });
      // Refrescar la lista
      this.favoritos = this.favoritos.filter(f => f.id !== id);
    } catch (error) {
      console.error('Error quitando favorito:', error);
    }
  }
}
