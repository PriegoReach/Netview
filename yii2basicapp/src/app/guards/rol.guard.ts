import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { AuthService }    from '../services/auth.service';

export const rolGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const auth      = inject(AuthService);
  const router    = inject(Router);
  const alertCtrl = inject(AlertController);

  // Sin token: a login
  if (!auth.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  // Obtener la ruta completa desde state.url (sin slash inicial ni query)
  const vista = state.url.replace(/^\//, '').split('?')[0];

  // Parsear los permisos guardados
  const permisosRaw = localStorage.getItem('netview_permisos');
  let permisos: string[] = [];
  try {
    permisos = JSON.parse(permisosRaw || '[]');
  } catch {
    permisos = [];
  }

  console.log('[rolGuard] Ruta solicitada:', vista);
  console.log('[rolGuard] Permisos del usuario:', permisos);

  // Verificar si la ruta coincide con algún permiso
  // Convierte ":parametro" en un comodín que acepta cualquier segmento
  const tienePermiso = permisos.some((p: string) => {
    const patron = '^' + p.replace(/:[^/]+/g, '[^/]+') + '$';
    return new RegExp(patron).test(vista);
  });

  console.log('[rolGuard] ¿tiene permiso?', tienePermiso);

  if (tienePermiso) {
    return true;
  }

  // Sin permiso: alerta y redirigir
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
