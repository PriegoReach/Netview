// src/app/contenido-detalle/contenido-detalle.page.ts

import { Component, OnInit }                  from '@angular/core';
import { ActivatedRoute, Router }             from '@angular/router';
import { LoadingController }                  from '@ionic/angular';
import axios                                  from 'axios';

import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

interface Episodio {
  id:       number;
  numero:   number;
  titulo:   string;
  duracion: number;
}

interface Temporada {
  id:        number;
  numero:    number;
  episodios: Episodio[];
}

interface ContenidoDetalle {
  id:            number;
  titulo:        string;
  descripcion:   string;
  imagen:        string;
  anio:          number;
  clasificacion: string;
  calificacion:  number;
  tipo:          'Movie' | 'Series';
  duracion:      number;
  temporadas?:   Temporada[];
}

@Component({
  selector:    'app-contenido-detalle',
  templateUrl: './contenido-detalle.page.html',
  styleUrls:   ['./contenido-detalle.page.scss'],
  standalone:  false,
})
export class ContenidoDetallePage implements OnInit {

  contenido:          ContenidoDetalle | null = null;
  temporadaActiva:    number | null           = null;
  episodiosTemporada: Episodio[]              = [];

  // ── Estado de favorito ──
  esFavorito: boolean = false;
  procesandoFav: boolean = false;

  private baseUrl = environment.apiUrl;

  constructor(
    private route:       ActivatedRoute,
    private router:      Router,
    private loadingCtrl: LoadingController,
    private auth:        AuthService,
  ) {}

  ngOnInit() {
    this.cargarContenido();
  }

  // ── Cargar detalle ────────────────────────────────────────────────────────
  async cargarContenido() {
    const id = this.route.snapshot.paramMap.get('id');

    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();

    try {
      const response = await axios({
        method:          'get',
        url:             `${this.baseUrl}/contenidos/${id}`,
        withCredentials: true,
        headers:         { 'Accept': 'application/json' },
      });

      this.contenido = response.data;

      // Si es serie, seleccionar la primera temporada por defecto
      if (this.contenido?.tipo === 'Series' && this.contenido.temporadas?.length) {
        this.temporadaActiva    = this.contenido.temporadas[0].id;
        this.episodiosTemporada = this.contenido.temporadas[0].episodios;
      }

      // Verificar si está en favoritos
      await this.verificarFavorito();
    } catch (error) {
      console.error('Error al cargar detalle:', error);
    } finally {
      loading.dismiss();
    }
  }

  // ── Verifica si el contenido actual está en favoritos del usuario ────────
  async verificarFavorito() {
    if (!this.contenido || !this.auth.isAuthenticated()) return;

    try {
      const response = await axios({
        method:  'get',
        url:     `${this.baseUrl}/usuario/favoritos`,
        headers: this.auth.authHeaders(),
      });

      const lista: any[] = response.data || [];
      this.esFavorito = lista.some(f => f.id === this.contenido!.id);
    } catch (error) {
      console.error('Error verificando favorito:', error);
    }
  }

  // ── Toggle favorito ──────────────────────────────────────────────────────
  async toggleFavorito() {
    if (!this.contenido || this.procesandoFav) return;
    this.procesandoFav = true;

    try {
      if (this.esFavorito) {
        // Quitar
        await axios({
          method:  'delete',
          url:     `${this.baseUrl}/usuario/favoritos/${this.contenido.id}`,
          headers: this.auth.authHeaders(),
        });
        this.esFavorito = false;
      } else {
        // Agregar
        await axios({
          method:  'post',
          url:     `${this.baseUrl}/usuario/favoritos`,
          data:    { content_id: this.contenido.id },
          headers: this.auth.authHeaders(),
        });
        this.esFavorito = true;
      }
    } catch (error) {
      console.error('Error toggle favorito:', error);
    } finally {
      this.procesandoFav = false;
    }
  }

  // ── Cambiar temporada visible ─────────────────────────────────────────────
  cambiarTemporada() {
    const temporada = this.contenido?.temporadas?.find(
      (t) => t.id === this.temporadaActiva,
    );
    this.episodiosTemporada = temporada?.episodios ?? [];
  }

  // ── Reproducir contenido completo ─────────────────────────────────────────
  reproducir() {
    if (this.contenido?.tipo === 'Series' && this.episodiosTemporada.length > 0) {
      this.reproducirEpisodio(this.episodiosTemporada[0].id);
      return;
    }
    console.log('Reproducir película:', this.contenido?.id);
  }

  reproducirEpisodio(episodioId: number) {
    console.log('Reproducir episodio:', episodioId);
    // TODO: integrar reproductor real
  }

  // ── Compartir (placeholder) ──────────────────────────────────────────────
  compartir() {
    if (navigator.share && this.contenido) {
      navigator.share({
        title: this.contenido.titulo,
        text:  `Mira "${this.contenido.titulo}" en NETVIEW`,
        url:   window.location.href,
      }).catch(() => {});
    } else {
      console.log('Web Share API no disponible');
    }
  }
}