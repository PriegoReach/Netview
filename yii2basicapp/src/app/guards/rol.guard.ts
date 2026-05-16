// src/app/guards/rol.guard.ts

import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AlertController } from '@ionic/angular';   // ← este

import { AuthService }    from '../services/auth.service';
import { PermisoService } from '../services/permiso.service';

export const rolGuard: CanActivateFn = async (route: ActivatedRouteSnapshot) => {
  const auth      = inject(AuthService);
  const permisos  = inject(PermisoService);
  const router    = inject(Router);
  const alertCtrl = inject(AlertController);

  if (!auth.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  const vista = route.routeConfig?.path ?? '';

  // ── DEBUG ──
  console.log('rolGuard chequeando vista:', vista);
  console.log('permisos del usuario:', permisos.getPermisos());
  console.log('¿tiene permiso?', permisos.has(vista));

  if (permisos.has(vista)) {
    return true;
  }

  const alert = await alertCtrl.create({
    header:  'Acceso denegado',
    message: 'No tienes permiso para entrar a esta sección.',
    buttons: ['OK'],
    cssClass: 'alert-center',
  });
  await alert.present();

  router.navigate(['/tabs/tab1']);
  return false;
};