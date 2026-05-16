// src/app/content-create/content-create.page.ts

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormControl, FormGroup, FormArray, Validators,
} from '@angular/forms';
import { Router }                             from '@angular/router';
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
  selector:    'app-content-create',
  templateUrl: './content-create.page.html',
  styleUrls:   ['./content-create.page.scss'],
  standalone:  false,
})
export class ContentCreatePage implements OnInit {

  public contenido!: FormGroup;

  // ── Catálogos ──
  public generos: any[] = [];
  public idiomas: any[] = [];
  public generosCargados = false;
  public idiomasCargados = false;

  // ── Archivo de imagen ──
  public archivoSeleccionado: File | null = null;
  public previewUrl: string | null = null;

  // ── Tipos para los selects ──
  public tipos = [
    { value: 'Movie',  label: 'Película' },
    { value: 'Series', label: 'Serie'    },
  ];

  public tiposIdioma = [
    { value: 'audio',    label: 'Audio'     },
    { value: 'subtitle', label: 'Subtítulo' },
  ];

  // ── Mensajes de validación ──
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
    this.buildForm();
    this.cargarGeneros();
    this.cargarIdiomas();
  }

  // ── Construcción del formulario con FormArrays ────────────────────────────
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

  agregarGenero() {
    this.generosFA.push(new FormControl(null, Validators.required));
  }

  eliminarGenero(index: number) { this.generosFA.removeAt(index); }

  agregarIdioma() {
    const grupo = this.fb.group({
      language_id:   [null,    Validators.required],
      language_type: ['audio', Validators.required],
    });
    this.idiomasFA.push(grupo);
  }

  eliminarIdioma(index: number) { this.idiomasFA.removeAt(index); }

  // ── Cargar catálogos ───────────────────────────────────────────────────────
  cargarGeneros() {
    this.genreSrv.listado('?per-page=100').subscribe(
      (response) => { this.generos = response; this.generosCargados = true; },
      (error) => console.error('Error géneros:', error),
    );
  }

  cargarIdiomas() {
    this.languageSrv.listado('?per-page=100').subscribe(
      (response) => { this.idiomas = response; this.idiomasCargados = true; },
      (error) => console.error('Error idiomas:', error),
    );
  }

  // ── Selección de archivo de imagen ─────────────────────────────────────────
  onFileSelected(event: any) {
    const file: File = event.target.files?.[0];
    if (!file) return;

    // Validar tamaño (5MB máx)
    if (file.size > 5 * 1024 * 1024) {
      this.alertError('La imagen excede el límite de 5MB.');
      return;
    }

    this.archivoSeleccionado = file;

    // Generar preview
    const reader = new FileReader();
    reader.onload = (e) => { this.previewUrl = e.target?.result as string; };
    reader.readAsDataURL(file);
  }

  quitarImagen() {
    this.archivoSeleccionado = null;
    this.previewUrl = null;
  }

  // ── Guardar contenido + relaciones + imagen ────────────────────────────────
  async guardar() {
    const valores = this.contenido.value;

    const loading = await this.loadingCtrl.create({
      message: 'Guardando...',
      spinner: 'bubbles',
    });
    await loading.present();

    // 1. Crear el contenido (sin image_url; se setea al subir archivo)
    const datosContent = {
      title:            valores.title,
      description:      valores.description,
      duration_minutes: valores.duration_minutes,
      content_type:     valores.content_type,
      image_url:        '', // se actualiza después si hay archivo
      release_year:     valores.release_year,
      clasificacion:    valores.clasificacion,
    };

    this.contentSrv.crear(datosContent).subscribe(
      async (response) => {
        const contentId = response.data?.content_id;

        if (!contentId) {
          loading.dismiss();
          this.alertError('No se pudo obtener el ID del contenido creado.');
          return;
        }

        // 2. Guardar géneros e idiomas
        this.guardarGeneros(contentId);
        this.guardarIdiomas(contentId);

        // 3. Subir imagen si fue seleccionada
        if (this.archivoSeleccionado) {
          await this.subirImagen(contentId);
        }

        setTimeout(async () => {
          loading.dismiss();
          await this.alertExito('Contenido creado correctamente.');
          this.router.navigate(['/content-list'], { replaceUrl: true });
        }, 500);
      },
      (error) => {
        loading.dismiss();
        const mensaje = error?.response?.data?.message
          || error?.message
          || 'No se pudo guardar el contenido.';
        this.alertError(mensaje);
      },
    );
  }

  // ── Subir archivo al backend ───────────────────────────────────────────────
  private async subirImagen(contentId: number) {
    if (!this.archivoSeleccionado) return;

    const formData = new FormData();
    formData.append('imagen', this.archivoSeleccionado);

    try {
      await axios({
        method: 'post',
        url:    `${this.baseUrl}/content/subir-imagen/${contentId}`,
        data:   formData,
        headers: {
          // OJO: no se pone Content-Type, el navegador lo arma con boundary
          'Authorization': 'Bearer ' + (this.auth.getToken() ?? ''),
        },
      });
    } catch (error) {
      console.error('Error subiendo imagen:', error);
    }
  }

  // ── Insertar relaciones content_genres ─────────────────────────────────────
  private guardarGeneros(contentId: number) {
    const seleccionados: number[] = this.generosFA.value
      .filter((id: any) => id != null && id !== '');

    seleccionados.forEach(genreId => {
      this.cgSrv.crear({ content_id: contentId, genre_id: genreId }).subscribe(
        () => {},
        (err) => console.error('Error guardando género:', err),
      );
    });
  }

  // ── Insertar relaciones content_languages ──────────────────────────────────
  private guardarIdiomas(contentId: number) {
    const seleccionados = this.idiomasFA.value
      .filter((item: any) => item?.language_id != null);

    seleccionados.forEach((item: any) => {
      this.clSrv.crear({
        content_id:    contentId,
        language_id:   item.language_id,
        language_type: item.language_type,
      }).subscribe(
        () => {},
        (err) => console.error('Error guardando idioma:', err),
      );
    });
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