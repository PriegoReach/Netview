// src/app/login/login.page.ts
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators }       from '@angular/forms';
import { Router }                                   from '@angular/router';
import { AlertController, LoadingController }       from '@ionic/angular';
import { LoginService }   from '../services/login.service';
import { AuthService }    from '../services/auth.service';
import { PermisoService } from '../services/permiso.service';

@Component({
  selector:    'app-login',
  templateUrl: './login.page.html',
  styleUrls:   ['./login.page.scss'],
  standalone:  false,
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;
  tipoPassword: 'text' | 'password' = 'password';

  mensajes: any = {
    username: [
      { type: 'required',  message: 'Usuario requerido.' },
      { type: 'minlength', message: 'Mínimo 3 caracteres.' },
    ],
    password: [
      { type: 'required',  message: 'Contraseña requerida.' },
      { type: 'minlength', message: 'Mínimo 6 caracteres.' },
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
    this.loginForm = this.fb.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ])],
    });
  }

  async submitLogin() {
    const credenciales = this.loginForm.value;

    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.loginSrv.login(credenciales).subscribe(
      (response) => {
        const data = response.data;

        if (data?.token) {
          // 1. Guardar datos de usuario
          this.auth.setUser({
            token:    data.token,
            username: data.username,
            nombre:   data.nombre,
            rol:      data.rol,
            es_admin: data.es_admin,
          });

          // 2. Cargar permisos antes de entrar a la app
          this.permisos.cargarPermisos().subscribe(
            () => {
              loading.dismiss();
              this.router.navigate(['/tabs/tab1'], { replaceUrl: true });
            },
            (errPermisos) => {
              loading.dismiss();
              console.error('Error cargando permisos:', errPermisos);
              this.alertError('No se pudieron cargar los permisos.');
            },
          );
        } else {
          loading.dismiss();
          this.alertError('Respuesta inválida del servidor.');
        }
      },
      (error) => {
        loading.dismiss();
        if (error?.response?.status === 401) {
          this.alertError('Usuario o contraseña incorrectos.');
        } else {
          this.alertError('No se pudo conectar al servidor.');
        }
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
    const control = this.loginForm.get(controlName);
    if (control?.touched && control?.errors) {
      errors = control.errors;
    }
    return errors;
  }

  togglePassword() {
    this.tipoPassword = this.tipoPassword === 'text' ? 'password' : 'text';
  }

  irRegistro() {
  this.router.navigate(['/registro']);
  }
}