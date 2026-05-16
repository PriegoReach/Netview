// src/app/tab2/tab2.page.ts

import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';
import { LoadingController }  from '@ionic/angular';
import axios                  from 'axios';

import { GenreService } from '../services/genre.service';
import { environment }  from '../../environments/environment';

interface Contenido {
  id:            number;
  titulo:        string;
  imagen:        string;
  anio:          number;
  clasificacion: string;
  calificacion:  number;
  categoria:     number;
}

interface CategoriaFiltro {
  id:     number | null;   // null = "Todos"
  nombre: string;
}

@Component({
  selector:    'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls:   ['tab2.page.scss'],
  standalone:  false,
})
export class Tab2Page implements OnInit {

  contenidos:       Contenido[]       = [];
  categoriasFiltro: CategoriaFiltro[] = [
    { id: null, nombre: 'Todos' },   // Por defecto siempre está
  ];

  busqueda:        string        = '';
  categoriaActiva: number | null = null;
  cargando:        boolean       = false;

  private baseUrl = environment.apiUrl;

  constructor(
    private router:       Router,
    private loadingCtrl:  LoadingController,
    private genreService: GenreService,
  ) {}

  ngOnInit() {
    this.cargarGeneros();
    this.buscarContenidos();
  }

  // ── Cargar géneros dinámicamente desde la BD ─────────────────────────────
  cargarGeneros() {
    this.genreService.listado('?per-page=100').subscribe(
      (response: any[]) => {
        // Mantener "Todos" al inicio y agregar los géneros reales después
        const dinamicos: CategoriaFiltro[] = response.map((g: any) => ({
          id:     g.genre_id,
          nombre: g.genre_name,
        }));

        this.categoriasFiltro = [
          { id: null, nombre: 'Todos' },
          ...dinamicos,
        ];
      },
      (error) => {
        console.error('Error cargando géneros:', error);
      },
    );
  }

  // ── Manejar input del buscador ────────────────────────────────────────────
  handleInput(event: any) {
    this.busqueda = event.target.value?.toLowerCase() ?? '';
    this.buscarContenidos();
  }

  // ── Seleccionar filtro de categoría ──────────────────────────────────────
  filtrarCategoria(id: number | null) {
    this.categoriaActiva = id;
    this.buscarContenidos();
  }

  // ── Búsqueda principal ────────────────────────────────────────────────────
  async buscarContenidos() {
    this.cargando = true;

    const loading = await this.loadingCtrl.create({
      message: 'Buscando',
      spinner: 'bubbles',
    });
    await loading.present();

    let url = `${this.baseUrl}/contenidos/buscar`;

    if (this.busqueda !== '') {
      url += `/${this.busqueda}`;
    }

    if (this.categoriaActiva !== null) {
      url += `?categoria=${this.categoriaActiva}`;
    }

    await axios({
      method:          'get',
      url,
      withCredentials: true,
      headers:         { 'Accept': 'application/json' },
    }).then((response) => {
      this.contenidos = response.data;
    }).catch((error) => {
      console.log('Error búsqueda:', error);
      this.contenidos = [];
    });

    this.cargando = false;
    loading.dismiss();
  }

  // ── Navegación al detalle ─────────────────────────────────────────────────
  verDetalle(id: number) {
    this.router.navigate(['/contenido', id]);
  }
}