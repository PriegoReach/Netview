// src/app/content-edit/content-edit.page.ts

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, FormArray, Validators,
} from '@angular/forms';
import { ActivatedRoute, Router }             from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import axios                                  from 'axios';

import { ContentService }         from '../services/content.service';
import { GenreService }           from '../services/genre.service';
import { LanguageService }        from '../services/language.service';
import { ContentGenreService }    from '../services/content-genre.service';
import { ContentLanguageService } from '../services/content-language.service';
import { AuthService }            from '../services/auth.service';
import { environment }            from '../../environments/environment';

@Component({
  selector:    'app-content-edit',
  templateUrl: './content-edit.page.html',
  styleUrls:   ['./content-edit.page.scss'],
  standalone:  false,
})
export class ContentEditPage implements OnInit {

  public contenido!: FormGroup;
  public contentId!: number;

  // ── Catálogos ──
  public generos: any[] = [];
  public idiomas: any[] = [];
  public generosCargados = false;
  public idiomasCargados = false;

  // ── Datos previos (para comparar al guardar) ──
  public generosPrevios: number[] = [];
  public idiomasPrevios: any[]   = [];

  // ── Archivo de imagen ──
  public archivoSeleccionado: File | null = null;
  public previewUrl:          string | null = null;
  public imagenActual:        string | null = null;

  // ── Tipos ──
  public tipos = [
    { value: 'Movie',  label: 'Película' },
    { value: 'Series', label: 'Serie'    },
  ];

  public tiposIdioma = [
    { value: 'audio',    label: 'Audio'     },
    { value: 'subtitle', label: 'Subtítulo' },
  ];

  public mensajes: any = {
    title: [
      { type: 'required',  message: 'Título requerido.' },
      { type: 'maxlength', message: 'Máximo 150 caracteres.' },
    ],
    duration_minutes: [
      { type: 'required', message: 'Duración requerida.' },
      { type: 'min',      message: 'Mínimo 1 minuto.' },
    ],
    content_type: [
      { type: 'required', message: 'Tipo requerido.' },
    ],
  };

  private baseUrl = environment.apiUrl;

  constructor(
    private fb:           FormBuilder,
    private route:        ActivatedRoute,
    private router:       Router,
    private alertCtrl:    AlertController,
    private loadingCtrl:  LoadingController,
    private contentSrv:   ContentService,
    private genreSrv:     GenreService,
    private languageSrv:  LanguageService,
    private cgSrv:        ContentGenreService,
    private clSrv:        ContentLanguageService,
    private auth:         AuthService,
  ) {}

  ngOnInit() {
    // El id puede venir como queryParam (genre-list usa este patrón) o como param
    this.contentId = +(
      this.route.snapshot.queryParamMap.get('id')
      ?? this.route.snapshot.paramMap.get('id')
      ?? '0'
    );

    this.buildForm();
    this.cargarCatalogos();
  }

  // ── Construcción del formulario ────────────────────────────────────────────
  private buildForm() {
    this.contenido = this.fb.group({
      title:            ['', [Validators.required, Validators.maxLength(150)]],
      description:      [''],
      duration_minutes: ['', [Validators.required, Validators.min(1)]],
      content_type:     ['Movie', Validators.required],
      release_year:     [new Date().getFullYear()],
      clasificacion:    ['+13'],

      generos: this.fb.array([]),
      idiomas: this.fb.array([]),
    });
  }

  get generosFA(): FormArray { return this.contenido.get('generos') as FormArray; }
  get idiomasFA(): FormArray { return this.contenido.get('idiomas') as FormArray; }

  getIdiomaGrupo(i: number): FormGroup {
    return this.idiomasFA.at(i) as FormGroup;
  }

  // ── Cargar todo en cascada ─────────────────────────────────────────────────
  async cargarCatalogos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();

    try {
      // 1. Cargar catálogos en paralelo
      await new Promise<void>((resolve) => {
        this.genreSrv.listado('?per-page=100').subscribe(
          (r) => { this.generos = r; this.generosCargados = true; resolve(); },
          ()  => resolve(),
        );
      });

      await new Promise<void>((resolve) => {
        this.languageSrv.listado('?per-page=100').subscribe(
          (r) => { this.idiomas = r; this.idiomasCargados = true; resolve(); },
          ()  => resolve(),
        );
      });

      // 2. Cargar el contenido a editar (con géneros e idiomas expandidos)
      await this.cargarContenido();

    } finally {
      loading.dismiss();
    }
  }

  private cargarContenido(): Promise<void> {
    return new Promise((resolve) => {
      this.contentSrv.detalle(this.contentId, '?expand=genres,languages').subscribe(
        (data: any) => {
          // Pre-llenar campos simples
          this.contenido.patchValue({
            title:            data.title,
            description:      data.description,
            duration_minutes: data.duration_minutes,
            content_type:     data.content_type,
            release_year:     data.release_year,
            clasificacion:    data.clasificacion,
          });

          // Imagen actual
          this.imagenActual = data.image_url || null;

          // Pre-llenar géneros (FormArray)
          if (data.genres && Array.isArray(data.genres)) {
            data.genres.forEach((g: any) => {
              this.generosFA.push(new FormControl(g.genre_id, Validators.required));
              this.generosPrevios.push(g.genre_id);
            });
          }

          // Pre-llenar idiomas (FormArray con grupo)
          if (data.languages && Array.isArray(data.languages)) {
            data.languages.forEach((l: any) => {
              this.idiomasFA.push(this.fb.group({
                language_id:   [l.language_id,   Validators.required],
                language_type: [l.language_type, Validators.required],
              }));
              this.idiomasPrevios.push({
                language_id:   l.language_id,
                language_type: l.language_type,
              });
            });
          }

          resolve();
        },
        (err) => {
          console.error('Error cargando contenido:', err);
          resolve();
        },
      );
    });
  }

  // ── Géneros e idiomas (igual que en create) ────────────────────────────────
  agregarGenero() {
    this.generosFA.push(new FormControl(null, Validators.required));
  }
  eliminarGenero(i: number) { this.generosFA.removeAt(i); }

  agregarIdioma() {
    this.idiomasFA.push(this.fb.group({
      language_id:   [null,    Validators.required],
      language_type: ['audio', Validators.required],
    }));
  }
  eliminarIdioma(i: number) { this.idiomasFA.removeAt(i); }

  // ── Selección de archivo ───────────────────────────────────────────────────
  onFileSelected(event: any) {
    const file: File = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      this.alertError('La imagen excede el límite de 5MB.');
      return;
    }

    this.archivoSeleccionado = file;
    const reader = new FileReader();
    reader.onload = (e) => { this.previewUrl = e.target?.result as string; };
    reader.readAsDataURL(file);
  }

  quitarImagen() {
    this.archivoSeleccionado = null;
    this.previewUrl = null;
  }

  // ── Guardar cambios ────────────────────────────────────────────────────────
  async guardar() {
    const valores = this.contenido.value;

    const loading = await this.loadingCtrl.create({
      message: 'Guardando...',
      spinner: 'bubbles',
    });
    await loading.present();

    // 1. Actualizar campos básicos del contenido
    const datosContent = {
      title:            valores.title,
      description:      valores.description,
      duration_minutes: valores.duration_minutes,
      content_type:     valores.content_type,
      release_year:     valores.release_year,
      clasificacion:    valores.clasificacion,
    };

    this.contentSrv.actualizar(this.contentId, datosContent).subscribe(
      async () => {
        // 2. Sincronizar géneros (eliminar previos no presentes, crear nuevos)
        await this.sincronizarGeneros();

        // 3. Sincronizar idiomas
        await this.sincronizarIdiomas();

        // 4. Subir imagen si fue cambiada
        if (this.archivoSeleccionado) {
          await this.subirImagen();
        }

        setTimeout(async () => {
          loading.dismiss();
          await this.alertExito('Contenido actualizado correctamente.');
          this.router.navigate(['/content-list'], { replaceUrl: true });
        }, 500);
      },
      (error) => {
        loading.dismiss();
        const mensaje = error?.response?.data?.message
          || error?.message
          || 'No se pudo actualizar el contenido.';
        this.alertError(mensaje);
      },
    );
  }

  // ── Sincronizar géneros (eliminar viejos + crear nuevos) ───────────────────
  private async sincronizarGeneros() {
    const actuales: number[] = this.generosFA.value
      .filter((id: any) => id != null && id !== '');

    // Eliminar los que estaban antes y ya no están
    const aEliminar = this.generosPrevios.filter(id => !actuales.includes(id));
    for (const genreId of aEliminar) {
      await new Promise<void>((resolve) => {
        this.cgSrv.eliminar(this.contentId, genreId).subscribe(
          () => resolve(),
          () => resolve(),
        );
      });
    }

    // Crear los nuevos
    const aCrear = actuales.filter(id => !this.generosPrevios.includes(id));
    for (const genreId of aCrear) {
      await new Promise<void>((resolve) => {
        this.cgSrv.crear({ content_id: this.contentId, genre_id: genreId }).subscribe(
          () => resolve(),
          () => resolve(),
        );
      });
    }
  }

  // ── Sincronizar idiomas (eliminar todos los previos + crear actuales) ──────
  // Como tienen clave triple, lo más simple es eliminar todos y crear los actuales
  private async sincronizarIdiomas() {
    // Eliminar todos los previos
    for (const prev of this.idiomasPrevios) {
      await new Promise<void>((resolve) => {
        this.clSrv.eliminar(this.contentId, prev.language_id, prev.language_type).subscribe(
          () => resolve(),
          () => resolve(),
        );
      });
    }

    // Crear los actuales
    const actuales = this.idiomasFA.value.filter((it: any) => it?.language_id != null);
    for (const item of actuales) {
      await new Promise<void>((resolve) => {
        this.clSrv.crear({
          content_id:    this.contentId,
          language_id:   item.language_id,
          language_type: item.language_type,
        }).subscribe(
          () => resolve(),
          () => resolve(),
        );
      });
    }
  }

  // ── Subir imagen (reutiliza endpoint de content-create) ───────────────────
  private async subirImagen() {
    if (!this.archivoSeleccionado) return;

    const formData = new FormData();
    formData.append('imagen', this.archivoSeleccionado);

    try {
      await axios({
        method: 'post',
        url:    `${this.baseUrl}/content/subir-imagen/${this.contentId}`,
        data:   formData,
        headers: {
          'Authorization': 'Bearer ' + (this.auth.getToken() ?? ''),
        },
      });
    } catch (error) {
      console.error('Error subiendo imagen:', error);
    }
  }

  // ── Helpers UI ─────────────────────────────────────────────────────────────
  async alertExito(msg: string) {
    const alert = await this.alertCtrl.create({
      header:   'Listo',
      message:  msg,
      cssClass: 'alert-center',
      buttons:  ['OK'],
    });
    await alert.present();
    await alert.onDidDismiss();
  }

  async alertError(msg: string) {
    const alert = await this.alertCtrl.create({
      header:    'Importante',
      subHeader: 'Error',
      message:   msg,
      cssClass:  'alert-center',
      buttons:   ['OK'],
    });
    await alert.present();
  }

  getError(controlName: string) {
    let errors: any = {};
    const control = this.contenido.get(controlName);
    if (control?.touched && control?.errors) {
      errors = control.errors;
    }
    return errors;
  }
}