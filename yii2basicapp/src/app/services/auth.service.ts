// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';

export interface UsuarioAuth {
  token:    string;
  username: string;
  nombre:   string;
  rol:      string;
  es_admin: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly TOKEN_KEY    = 'netview_auth_token';
  private readonly USERNAME_KEY = 'netview_auth_username';
  private readonly NOMBRE_KEY   = 'netview_auth_nombre';
  private readonly ROL_KEY      = 'netview_auth_rol';
  private readonly ADMIN_KEY    = 'netview_auth_admin';

  // ── Guardar datos completos al hacer login ────────────────────────────
  setUser(data: UsuarioAuth): void {
    localStorage.setItem(this.TOKEN_KEY,    data.token);
    localStorage.setItem(this.USERNAME_KEY, data.username);
    localStorage.setItem(this.NOMBRE_KEY,   data.nombre);
    localStorage.setItem(this.ROL_KEY,      data.rol);
    localStorage.setItem(this.ADMIN_KEY,    data.es_admin ? '1' : '0');
  }

  // ── Limpiar (logout) ──────────────────────────────────────────────────
  clear(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USERNAME_KEY);
    localStorage.removeItem(this.NOMBRE_KEY);
    localStorage.removeItem(this.ROL_KEY);
    localStorage.removeItem(this.ADMIN_KEY);
  }

  // ── Getters ───────────────────────────────────────────────────────────
  getToken():    string | null { return localStorage.getItem(this.TOKEN_KEY); }
  getUsername(): string | null { return localStorage.getItem(this.USERNAME_KEY); }
  getNombre():   string | null { return localStorage.getItem(this.NOMBRE_KEY); }
  getRol():      string | null { return localStorage.getItem(this.ROL_KEY); }

  esAdmin(): boolean {
    return localStorage.getItem(this.ADMIN_KEY) === '1';
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // ── Headers listos para axios ─────────────────────────────────────────
  authHeaders() {
    return {
      'Accept':        'application/json',
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${this.getToken() ?? ''}`,
    };
  }
}