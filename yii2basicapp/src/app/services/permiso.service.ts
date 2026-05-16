// src/app/services/permiso.service.ts

import { Injectable }  from '@angular/core';
import { Observable }  from 'rxjs';
import axios           from 'axios';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class PermisoService {

  private readonly PERMISOS_KEY = 'netview_permisos';
  private url: string = `${environment.apiUrl}/permiso/`;

  constructor(private auth: AuthService) {}

  /**
   * Carga la lista de permisos desde el backend y los guarda en localStorage.
   */
  cargarPermisos(): Observable<any> {
    const endpoint = `${this.url}lista-permisos?user=${this.auth.getToken() ?? ''}`;

    return new Observable(observer => {
      axios.get(endpoint, {
        withCredentials: true,
        headers: { 'Accept': 'application/json' },
      })
      .then(response => {
        if (Array.isArray(response.data)) {
          localStorage.setItem(this.PERMISOS_KEY, JSON.stringify(response.data));
        }
        observer.next(response.data);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  /**
   * Devuelve la lista actual de permisos guardada localmente.
   */
  getPermisos(): string[] {
    return JSON.parse(localStorage.getItem(this.PERMISOS_KEY) || '[]');
  }

  /**
   * Verifica si el usuario tiene acceso a una vista específica.
   */
  has(vista: string): boolean {
    return this.getPermisos().includes(vista);
  }

  /**
   * Limpia los permisos (llamar al hacer logout).
   */
  clear(): void {
    localStorage.removeItem(this.PERMISOS_KEY);
  }
}