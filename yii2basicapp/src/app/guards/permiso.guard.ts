import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

export const permisoGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Promise<boolean> => {
  const router = inject(Router);
  const alertCtrl = inject(AlertController);

  const token = localStorage.getItem('netview_auth_token');
  const permisosRaw = localStorage.getItem('netview_permisos');

  // 1. Si no hay token, mandar al login
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  // 2. Obtener la ruta completa desde state.url
  const vista = state.url.replace(/^\//, '').split('?')[0];

  // 3. Parsear los permisos guardados
  let permisos: string[] = [];
  try {
    permisos = JSON.parse(permisosRaw || '[]');
  } catch {
    permisos = [];
  }

  console.log('Ruta solicitada:', vista);
  console.log('Permisos del usuario:', permisos);

  // 4. Verificar si la ruta coincide con algún permiso
  //    Convierte ":parametro" en un comodín que acepta cualquier segmento
  const tienePermiso = permisos.some((p: string) => {
    const patron = '^' + p.replace(/:[^/]+/g, '[^/]+') + '$';
    return new RegExp(patron).test(vista);
  });

  console.log('¿tiene permiso?', tienePermiso);

  if (tienePermiso) {
    return true;
  }

  // 5. Si no tiene permiso, mostrar alerta y redirigir
  const alert = await alertCtrl.create({
    header: 'Acceso denegado',
    message: 'No tienes permiso para entrar a esta sección.',
    buttons: ['OK']
  });

  await alert.present();
  router.navigate(['/tabs/tab1']);
  return false;
};