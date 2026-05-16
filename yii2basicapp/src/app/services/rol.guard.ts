// src/app/guards/rol.guard.ts

import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { AuthService }    from '../services/auth.service';
import { PermisoService } from '../services/permiso.service';

export const rolGuard: CanActivateFn = async (route: ActivatedRouteSnapshot) => {
  const auth      = inject(AuthService);
  const permisos  = inject(PermisoService);
  const router    = inject(Router);
  const alertCtrl = inject(AlertController);

  // Sin token: a login
  if (!auth.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  // Identificar la vista que se está intentando abrir
  // Toma el path completo de la ruta tal como viene de Angular
  const vista = route.routeConfig?.path ?? '';

  // Si tiene permiso, dejar pasar
  if (permisos.has(vista)) {
    return true;
  }

  // Sin permiso: alerta y redirigir a la home
  const alert = await alertCtrl.create({
    header:   'Acceso denegado',
    message:  'No tienes permiso para entrar a esta sección.',
    buttons:  ['OK'],
    cssClass: 'alert-center',
  });
  await alert.present();

  router.navigate(['/tabs/tab1']);
  return false;
};