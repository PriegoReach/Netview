import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';
import { LoadingController }    from '@ionic/angular';
import axios                    from 'axios';
import { environment }          from '../../environments/environment';
// ── Interfaces ─────────────────────────────────────────────────────────────
interface Contenido {
  id:            number;
  titulo:        string;
  imagen:        string;
  anio:          number;
  clasificacion: string;
  calificacion:  number;
}

interface Categoria {
  nombre: string;
  items:  Contenido[];
}

// ── Componente ─────────────────────────────────────────────────────────────
@Component({
  selector:        'app-tab1',
  templateUrl:     'tab1.page.html',
  styleUrls:       ['tab1.page.scss'],
  standalone:      false,
})
export class Tab1Page implements OnInit {

  destacado:  Contenido | null = null;
  categorias: Categoria[]     = [];

  // Cambia esta URL base por la de tu API en Yii2
  private baseUrl = environment.apiUrl;


  constructor(
    private router:      Router,
    private loadingCtrl: LoadingController,
  ) {}

  ngOnInit() {
    this.cargarContenido();
  }

  // ── Carga principal ──────────────────────────────────────────────────────
  async cargarContenido() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();

    try {
      await this.cargarDestacado();
      await this.cargarCategorias();
    } catch (error) {
      console.error('Error al cargar contenido:', error);
    } finally {
      loading.dismiss();
    }
  }

  // ── Elemento destacado (hero banner) ────────────────────────────────────
  async cargarDestacado() {
    await axios({
      method:          'get',
      url:             `${this.baseUrl}/contenidos/destacado`,
      withCredentials: true,
      headers:         { 'Accept': 'application/json' },
    }).then((response) => {
      this.destacado = response.data;
    }).catch((error) => {
      console.log('Error destacado:', error);

      // Datos de prueba mientras conectas tu API
      this.destacado = {
        id:            1,
        titulo:        'TITULO DESTACADO',
        imagen:        'assets/placeholder.png',
        anio:          2024,
        clasificacion: '+13',
        calificacion:  4.8,
      };
    });
  }

  // ── Categorías con sus items ─────────────────────────────────────────────
  async cargarCategorias() {
    await axios({
      method:          'get',
      url:             `${this.baseUrl}/contenidos/categorias`,
      withCredentials: true,
      headers:         { 'Accept': 'application/json' },
    }).then((response) => {
      this.categorias = response.data;
    }).catch((error) => {
      console.log('Error categorías:', error);

      // Datos de prueba mientras conectas tu API
      const itemsEjemplo: Contenido[] = Array.from({ length: 6 }, (_, i) => ({
        id:            i + 1,
        titulo:        `Título ${i + 1}`,
        imagen:        'assets/placeholder.png',
        anio:          2024,
        clasificacion: '+13',
        calificacion:  4.5,
      }));

      this.categorias = [
        { nombre: 'Tendencias',  items: itemsEjemplo.slice(0, 6) },
        { nombre: 'Acción',      items: itemsEjemplo.slice(0, 6) },
        { nombre: 'Drama',       items: itemsEjemplo.slice(0, 6) },
      ];
    });
  }

  // ── Navegación al detalle ────────────────────────────────────────────────
  verDetalle(id: number) {
    this.router.navigate(['/contenido', id]);
  }

  irNotificaciones() {
  this.router.navigate(['/notificaciones']);
}

irFavoritos() {
  this.router.navigate(['/favoritos']);
}
}