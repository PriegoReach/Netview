// src/app/contenido-detalle/contenido-detalle.page.ts

import { Component, OnInit }                  from '@angular/core';
import { ActivatedRoute, Router }             from '@angular/router';
import { LoadingController, AlertController }  from '@ionic/angular';
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

  // ── Calificación del usuario (0 = sin calificar) ──
  miCalificacion: number = 0;

  // ── Reproductor de video ──
  reproduciendo:   boolean = false;   // overlay del reproductor visible
  videoUrl:        string  = '';      // fuente del <video>
  videoCompletado: boolean = false;   // el usuario vio el video hasta el final
  posicionInicial: number  = 0;       // segundos desde donde reanudar

  private episodioActual:   number | null = null; // episodio en reproducción (null = película)
  private posicionActual:   number = 0;            // segundo actual del video
  private segundosGuardados: number = 0;           // último valor enviado al backend

  private baseUrl = environment.apiUrl;

  constructor(
    private route:       ActivatedRoute,
    private router:      Router,
    private loadingCtrl: LoadingController,
    private alertCtrl:   AlertController,
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

      // Verificar si está en favoritos y la calificación del usuario
      await this.verificarFavorito();
      await this.cargarMiCalificacion();
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

  // ── Calificación del usuario ─────────────────────────────────────────────
  // Lee la calificación previa que el usuario dio a este contenido.
  async cargarMiCalificacion() {
    if (!this.contenido || !this.auth.isAuthenticated()) return;

    try {
      const response = await axios({
        method:  'get',
        url:     `${this.baseUrl}/usuario/calificacion/${this.contenido.id}`,
        headers: this.auth.authHeaders(),
      });
      this.miCalificacion = response.data?.score ?? 0;
    } catch (error) {
      console.error('Error obteniendo calificación:', error);
    }
  }

  // Abre un selector de estrellas (1–5) para calificar el contenido.
  async calificar() {
    if (!this.contenido) return;

    const alert = await this.alertCtrl.create({
      header:    'Calificar',
      subHeader: this.contenido.titulo,
      inputs: [1, 2, 3, 4, 5].map((n) => ({
        type:    'radio' as const,
        label:   '★'.repeat(n) + '☆'.repeat(5 - n),
        value:   n,
        checked: this.miCalificacion === n,
      })),
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (valor: number) => {
            if (valor) { this.guardarCalificacion(valor); }
          },
        },
      ],
    });
    await alert.present();
  }

  private async guardarCalificacion(score: number) {
    if (!this.contenido) return;

    try {
      const response = await axios({
        method:  'post',
        url:     `${this.baseUrl}/usuario/calificar`,
        data:    { content_id: this.contenido.id, score },
        headers: this.auth.authHeaders(),
      });
      this.miCalificacion = response.data?.tu_score ?? score;
      // Refresca el promedio mostrado en pantalla
      if (response.data?.calificacion != null) {
        this.contenido.calificacion = response.data.calificacion;
      }
    } catch (error) {
      console.error('Error al calificar:', error);
    }
  }

  // ── Reproductor de video ──────────────────────────────────────────────────
  // Abre el reproductor para la película (o el primer episodio si es serie).
  reproducir() {
    if (this.contenido?.tipo === 'Series' && this.episodiosTemporada.length > 0) {
      this.reproducirEpisodio(this.episodiosTemporada[0].id);
      return;
    }
    this.episodioActual = null;
    this.abrirReproductor();
  }

  reproducirEpisodio(episodioId: number) {
    this.episodioActual = episodioId;
    this.abrirReproductor();
  }

  // Prepara y muestra el overlay del reproductor.
  private async abrirReproductor() {
    if (!this.contenido) { return; }

    // Video de demostración: trailer local. Mientras no haya archivos de
    // video reales por contenido, todos usan el trailer de Batman como prueba.
    this.videoUrl        = 'assets/content/Batman%20dark%20night%20trailer.mp4';
    this.videoCompletado = false;
    this.posicionActual  = 0;

    // Recupera los segundos vistos para reanudar donde se quedó el usuario.
    this.posicionInicial   = await this.obtenerSegundosVistos();
    this.segundosGuardados = this.posicionInicial;

    this.reproduciendo = true;
  }

  // El video cargó sus metadatos: posiciona el cursor para reanudar.
  onVideoCargado(ev: Event) {
    const video = ev.target as HTMLVideoElement;
    if (this.posicionInicial > 0 && this.posicionInicial < video.duration) {
      video.currentTime = this.posicionInicial;
    }
    video.play().catch(() => { /* autoplay bloqueado: el usuario dará play */ });
  }

  // Avance del video: guarda el progreso cada 10 s para no saturar la API.
  onVideoProgreso(ev: Event) {
    const video = ev.target as HTMLVideoElement;
    this.posicionActual = Math.floor(video.currentTime);

    if (this.posicionActual > 0
        && this.posicionActual % 10 === 0
        && this.posicionActual !== this.segundosGuardados) {
      this.segundosGuardados = this.posicionActual;
      this.guardarProgreso(this.posicionActual);
    }
  }

  // El video terminó: se considera "visto" y se reinicia el contador a 0.
  async onVideoFinalizado() {
    this.videoCompletado   = true;
    this.posicionActual    = 0;
    this.segundosGuardados = 0;
    await this.guardarProgreso(0);
  }

  // Cierra el reproductor y guarda la posición final (salvo que ya se completó).
  async cerrarReproductor() {
    this.reproduciendo = false;

    if (!this.videoCompletado && this.posicionActual > this.segundosGuardados) {
      this.segundosGuardados = this.posicionActual;
      await this.guardarProgreso(this.posicionActual);
    }
  }

  // Lee los segundos vistos guardados en watch_history para este contenido.
  private async obtenerSegundosVistos(): Promise<number> {
    if (!this.auth.isAuthenticated() || !this.contenido) { return 0; }

    try {
      const response = await axios({
        method:  'get',
        url:     `${this.baseUrl}/usuario/historial/${this.contenido.id}`,
        headers: this.auth.authHeaders(),
      });
      return response.data?.watched_seconds ?? 0;
    } catch (error) {
      console.error('Error obteniendo progreso:', error);
      return 0;
    }
  }

  // Guarda el progreso en watch_history (vinculado al usuario autenticado).
  private async guardarProgreso(segundos: number) {
    if (!this.auth.isAuthenticated() || !this.contenido) { return; }

    try {
      await axios({
        method:  'post',
        url:     `${this.baseUrl}/usuario/historial`,
        data:    {
          content_id:      this.contenido.id,
          episode_id:      this.episodioActual,
          watched_seconds: segundos,
        },
        headers: this.auth.authHeaders(),
      });
    } catch (error) {
      console.error('Error guardando progreso:', error);
    }
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