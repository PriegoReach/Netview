// src/app/registro/registro.page.ts

import { Component, OnInit }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router }                             from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

import { LoginService }   from '../services/login.service';
import { AuthService }    from '../services/auth.service';
import { PermisoService } from '../services/permiso.service';

@Component({
  selector:    'app-registro',
  templateUrl: './registro.page.html',
  styleUrls:   ['./registro.page.scss'],
  standalone:  false,
})
export class RegistroPage implements OnInit {

  registroForm!: FormGroup;
  tipoPassword: 'text' | 'password' = 'password';

  mensajes: any = {
    username: [
      { type: 'required',  message: 'Usuario requerido.' },
      { type: 'minlength', message: 'Mínimo 3 caracteres.' },
      { type: 'maxlength', message: 'Máximo 20 caracteres.' },
      { type: 'pattern',   message: 'Solo letras, números y guion bajo.' },
    ],
    email: [
      { type: 'required', message: 'Email requerido.' },
      { type: 'email',    message: 'Email inválido.' },
    ],
    password: [
      { type: 'required',  message: 'Contraseña requerida.' },
      { type: 'minlength', message: 'Mínimo 6 caracteres.' },
    ],
    password_confirm: [
      { type: 'required',      message: 'Confirma tu contraseña.' },
      { type: 'notEquivalent', message: 'Las contraseñas no coinciden.' },
    ],
  };

  constructor(
    private fb:          FormBuilder,
    private router:      Router,
    private alertCtrl:   AlertController,
    private loadingCtrl: LoadingController,
    private loginSrv:    LoginService,
    private auth:        AuthService,
    private permisos:    PermisoService,
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.registroForm = this.fb.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9_]+$'),
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ])],
      password_confirm: ['', Validators.required],
    }, {
      validator: this.matchPasswords('password', 'password_confirm'),
    });
  }

  // Validator: las contraseñas deben coincidir
  matchPasswords(passKey: string, confirmKey: string) {
    return (group: FormGroup) => {
      const pass    = group.controls[passKey];
      const confirm = group.controls[confirmKey];
      if (pass.value !== confirm.value) {
        return confirm.setErrors({ notEquivalent: true });
      } else {
        return confirm.setErrors(null);
      }
    };
  }

  async submitRegistro() {
    const datos = {
      username: this.registroForm.value.username,
      email:    this.registroForm.value.email,
      password: this.registroForm.value.password,
    };

    const loading = await this.loadingCtrl.create({
      message: 'Creando cuenta...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.loginSrv.registrar(datos).subscribe(
      (response) => {
        const data = response.data;

        if (data?.token) {
          // Autologin después del registro
          this.auth.setUser({
            token:    data.token,
            username: data.username,
            nombre:   data.nombre,
            rol:      data.rol,
            es_admin: data.es_admin,
          });

          this.permisos.cargarPermisos().subscribe(
            () => {
              loading.dismiss();
              this.router.navigate(['/tabs/tab1'], { replaceUrl: true });
            },
            () => {
              loading.dismiss();
              this.alertError('Cuenta creada pero hubo error cargando permisos.');
            },
          );
        } else {
          loading.dismiss();
          this.alertError('Respuesta inválida del servidor.');
        }
      },
      (error) => {
        loading.dismiss();
        const mensaje = error?.response?.data?.error
          || 'No se pudo crear la cuenta.';
        this.alertError(mensaje);
      },
    );
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
    const control = this.registroForm.get(controlName);
    if (control?.touched && control?.errors) {
      errors = control.errors;
    }
    return errors;
  }

  togglePassword() {
    this.tipoPassword = this.tipoPassword === 'text' ? 'password' : 'text';
  }

  irLogin() {
    this.router.navigate(['/login']);
  }
}
