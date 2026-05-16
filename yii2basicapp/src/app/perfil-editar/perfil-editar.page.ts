// src/app/perfil-editar/perfil-editar.page.ts

import { Component, OnInit }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router }                             from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import axios                                  from 'axios';

import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector:    'app-perfil-editar',
  templateUrl: './perfil-editar.page.html',
  styleUrls:   ['./perfil-editar.page.scss'],
  standalone:  false,
})
export class PerfilEditarPage implements OnInit {

  editarForm!: FormGroup;
  tipoPassword: 'text' | 'password' = 'password';
  cargando = false;

  // ── Avatar ──
  archivoSeleccionado: File | null = null;
  previewUrl:          string | null = null;
  avatarActual:        string | null = null;

  mensajes: any = {
    email: [
      { type: 'email', message: 'Email inválido.' },
    ],
    password_nuevo: [
      { type: 'minlength', message: 'Mínimo 6 caracteres.' },
    ],
  };

  private baseUrl = environment.apiUrl;

  constructor(
    private fb:          FormBuilder,
    private router:      Router,
    private alertCtrl:   AlertController,
    private loadingCtrl: LoadingController,
    private auth:        AuthService,
  ) {}

  ngOnInit() {
    this.buildForm();
    this.cargarDatosActuales();
  }

  private buildForm() {
    this.editarForm = this.fb.group({
      username:        [{ value: '', disabled: true }],
      email:           ['', Validators.email],
      password_actual: [''],
      password_nuevo:  ['', Validators.minLength(6)],
    });
  }

  // ── Pre-rellenar con los datos actuales del usuario ──────────────────────
  async cargarDatosActuales() {
    try {
      const response = await axios({
        method:  'get',
        url:     `${this.baseUrl}/usuario/perfil`,
        headers: this.auth.authHeaders(),
      });

      this.editarForm.patchValue({
        username: response.data.username,
        email:    response.data.email,
      });

      this.avatarActual = response.data.avatar || null;
    } catch (error) {
      console.log('Error cargando perfil:', error);
    }
  }

  // ── Selección de avatar ───────────────────────────────────────────────────
  onFileSelected(event: any) {
    const file: File = event.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      this.alertError('El avatar excede el límite de 2MB.');
      return;
    }

    this.archivoSeleccionado = file;
    const reader = new FileReader();
    reader.onload = (e) => { this.previewUrl = e.target?.result as string; };
    reader.readAsDataURL(file);
  }

  quitarAvatar() {
    this.archivoSeleccionado = null;
    this.previewUrl = null;
  }

  // ── Guardar cambios ───────────────────────────────────────────────────────
  async submitEditar() {
    const valores = this.editarForm.value;

    // Validación: si se quiere cambiar password, validar consistencia
    if (valores.password_nuevo && !valores.password_actual) {
      this.alertError('Debes ingresar tu contraseña actual para cambiarla.');
      return;
    }

    // Construir solo lo que cambió
    const datos: any = {};
    if (valores.email)           datos.email           = valores.email;
    if (valores.password_actual) datos.password_actual = valores.password_actual;
    if (valores.password_nuevo)  datos.password_nuevo  = valores.password_nuevo;

    const hayDatos   = Object.keys(datos).length > 0;
    const hayAvatar  = this.archivoSeleccionado !== null;

    if (!hayDatos && !hayAvatar) {
      this.alertError('No has modificado nada.');
      return;
    }

    this.cargando = true;
    const loading = await this.loadingCtrl.create({
      message: 'Guardando...',
      spinner: 'bubbles',
    });
    await loading.present();

    try {
      // 1. Actualizar datos básicos (si hay)
      if (hayDatos) {
        await axios({
          method:  'put',
          url:     `${this.baseUrl}/usuario/perfil`,
          data:    datos,
          headers: this.auth.authHeaders(),
        });
      }

      // 2. Subir avatar (si hay)
      if (hayAvatar) {
        await this.subirAvatar();
      }

      loading.dismiss();
      this.cargando = false;

      await this.alertExito('Perfil actualizado correctamente.');
      this.router.navigate(['/tabs/tab3'], { replaceUrl: true });

    } catch (error: any) {
      loading.dismiss();
      this.cargando = false;
      const mensaje = error?.response?.data?.error
        || error?.response?.data?.message
        || 'No se pudo actualizar el perfil.';
      this.alertError(mensaje);
    }
  }

  private async subirAvatar() {
    if (!this.archivoSeleccionado) return;

    const formData = new FormData();
    formData.append('avatar', this.archivoSeleccionado);

    await axios({
      method: 'post',
      url:    `${this.baseUrl}/usuario/subir-avatar`,
      data:   formData,
      headers: {
        // OJO: NO incluir Content-Type, el navegador lo arma con boundary
        'Authorization': 'Bearer ' + (this.auth.getToken() ?? ''),
      },
    });
  }

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
    const control = this.editarForm.get(controlName);
    if (control?.touched && control?.errors) {
      errors = control.errors;
    }
    return errors;
  }

  togglePassword() {
    this.tipoPassword = this.tipoPassword === 'text' ? 'password' : 'text';
  }
}