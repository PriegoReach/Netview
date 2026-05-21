import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import axios                  from 'axios';
import { environment }        from '../../environments/environment';
import { AuthService }       from '../services/auth.service';
import { PermisoService } from '../services/permiso.service';

// ── Interfaces ────────────────────────────────────────────────────────────────
interface Suscripcion {
  plan:       string;     // 'Premium', 'Estándar', 'Básico'
  activo:     boolean;
  renovacion: string;     // formato ISO: '2025-01-01'
}

interface Usuario {
  id:          number;
  nombre:      string;
  email:       string;
  avatar:      string;
  suscripcion: Suscripcion;
}

interface ContinuarItem {
  id:       number;
  titulo:   string;
  imagen:   string;
  progreso: number;        // 0–100
}

// ── Componente ────────────────────────────────────────────────────────────────
@Component({
  selector:    'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls:   ['tab3.page.scss'],
  standalone:  false,
})
export class Tab3Page implements OnInit {

  usuario:          Usuario | null     = null;
  continuarViendo:  ContinuarItem[]    = [];

  // Cambia esta URL base por la de tu API en Yii2
  private baseUrl = environment.apiUrl;


  constructor(
    private router:      Router,
    private alertCtrl:   AlertController,
    private loadingCtrl: LoadingController,
    public  auth:        AuthService,
    private permisos:    PermisoService,
  ) {}

  ngOnInit() {
    this.cargarPerfil();
  }

  // ── Carga principal del perfil ───────────────────────────────────────────
  async cargarPerfil() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();

    try {
      await this.cargarUsuario();
      await this.cargarContinuarViendo();
    } catch (error) {
      console.error('Error al cargar perfil:', error);
    } finally {
      loading.dismiss();
    }
  }

  // ── Datos del usuario ────────────────────────────────────────────────────
  async cargarUsuario() {
    await axios({
      method:          'get',
      url:             `${this.baseUrl}/usuario/perfil`,
      withCredentials: true,
      headers:this.auth.authHeaders(),
    }).then((response) => {
      this.usuario = response.data;
    }).catch((error) => {
      console.log('Error usuario:', error);

      // Datos de prueba mientras conectas tu API
      this.usuario = {
        id:     1,
        nombre: 'Nombre del Usuario',
        email:  'mail@ejemplo.com',
        avatar: 'assets/placeholder.png',
        suscripcion: {
          plan:       'Premium',
          activo:     true,
          renovacion: '2025-01-01',
        },
      };
    });
  }

  // ── Lista de contenido en progreso ───────────────────────────────────────
  async cargarContinuarViendo() {
    await axios({
      method:          'get',
      url:             `${this.baseUrl}/usuario/continuar-viendo`,
      withCredentials: true,
      headers: this.auth.authHeaders(),
    }).then((response) => {
      this.continuarViendo = response.data;
    }).catch((error) => {
      console.log('Error continuar viendo:', error);

      // Datos de prueba mientras conectas tu API
      this.continuarViendo = [
        { id: 1, titulo: 'Serie A',    imagen: 'assets/placeholder.png', progreso: 38 },
        { id: 2, titulo: 'Película B', imagen: 'assets/placeholder.png', progreso: 72 },
        { id: 3, titulo: 'Serie C',    imagen: 'assets/placeholder.png', progreso: 20 },
      ];
    });
  }

  // ── Acciones del menú ────────────────────────────────────────────────────
  editarPerfil() {
    this.router.navigate(['/perfil-editar']);
  }

  abrirAjustes() {
    this.router.navigate(['/ajustes']);
  }

  cambiarPlan() {
    this.router.navigate(['/suscripcion/planes']);
  }

  reanudar(id: number) {
  this.router.navigate(['/contenido', id]);
  }

  // ── Cerrar sesión con confirmación ───────────────────────────────────────
  async cerrarSesion() {
    const alert = await this.alertCtrl.create({
      header:    'Cerrar sesión',
      message:   '¿Estás seguro de que deseas cerrar la sesión?',
      cssClass:  'alert-center',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text:    'Confirmar',
          role:    'confirm',
          
          handler: () => {
            this.auth.clear();
            this.router.navigate(['/login'], { replaceUrl: true });
            this.auth.clear();
            this.permisos.clear();
          },
        },
      ],
    });
    await alert.present();
  }
}