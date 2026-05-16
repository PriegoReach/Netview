// src/app/services/login.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios          from 'axios';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LoginService {

  private url: string = `${environment.apiUrl}/auth/`;
  private headers: any = {
    'Content-Type': 'application/json',
    'Accept':       'application/json',
  };

  // POST /auth/login
  login(credenciales: { username: string; password: string }): Observable<any> {
    const endpoint = `${this.url}login`;
    return new Observable(observer => {
      axios.post(endpoint, credenciales, {
        withCredentials: true,
        headers: this.headers,
      })
      .then(response => { observer.next(response); observer.complete(); })
      .catch(error    => { observer.error(error);  observer.complete(); });
    });
  }

  // POST /auth/registrar
  registrar(datos: { username: string; password: string; email: string }): Observable<any> {
    const endpoint = `${this.url}registrar`;
    return new Observable(observer => {
      axios.post(endpoint, datos, {
        withCredentials: true,
        headers: this.headers,
      })
      .then(response => { observer.next(response); observer.complete(); })
      .catch(error    => { observer.error(error);  observer.complete(); });
    });
  }
}