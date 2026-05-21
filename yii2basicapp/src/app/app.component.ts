// src/app/app.component.ts

import { Component }       from '@angular/core';
import { Router }          from '@angular/router';
import { AlertController } from '@ionic/angular';

import { AuthService }    from './services/auth.service';
import { PermisoService } from './services/permiso.service';

interface Enlace {
  ruta:  string;
  texto: string;
}

interface SeccionMenu {
  titulo:  string;
  enlaces: Enlace[];
}

@Component({
  selector:    'app-root',
  templateUrl: 'app.component.html',
  styleUrls:   ['app.component.scss'],
  standalone:  false,
})
export class AppComponent {

  // Menú admin agrupado: las 13 gestiones siguen accesibles, organizadas
  // por su naturaleza — Catálogo, Relaciones (tablas puente) y Usuarios.
  secciones: SeccionMenu[] = [
    {
      titulo: 'Catálogo',
      enlaces: [
        { ruta: '/content-list',           texto: 'Content' },
        { ruta: '/genre-list',             texto: 'Genre' },
        { ruta: '/language-list',          texto: 'Language' },
        { ruta: '/season-list',            texto: 'Season' },
        { ruta: '/episode-list',           texto: 'Episode' },
        { ruta: '/subscription-plan-list', texto: 'Subscription Plan' },
      ],
    },
    {
      titulo: 'Relaciones',
      enlaces: [
        { ruta: '/content-genre-list',    texto: 'Content Genre' },
        { ruta: '/content-language-list', texto: 'Content Language' },
      ],
    },
    {
      titulo: 'Usuarios',
      enlaces: [
        { ruta: '/profile-list',       texto: 'Profile' },
        { ruta: '/subscription-list',  texto: 'Subscription' },
        { ruta: '/favorite-list',      texto: 'Favorite' },
        { ruta: '/rating-list',        texto: 'Rating' },
        { ruta: '/watch-history-list', texto: 'Watch History' },
      ],
    },
  ];

  constructor(
    public  auth:      AuthService,
    private permisos:  PermisoService,
    private router:    Router,
    private alertCtrl: AlertController,
  ) {}

  // ── Cerrar sesión con confirmación ──────────────────────────────────────
  async cerrarSesion() {
    const alert = await this.alertCtrl.create({
      header:   'Cerrar sesión',
      message:  '¿Estás seguro de que deseas cerrar la sesión?',
      cssClass: 'alert-center',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.auth.clear();
            this.permisos.clear();
            this.router.navigate(['/login'], { replaceUrl: true });
          },
        },
      ],
    });
    await alert.present();
  }
}