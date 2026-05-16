import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ContentLanguageService {

  private url: string = `${environment.apiUrl}/content-language`;

  private get headers(): any {
    return {
      'Content-Type':  'application/json',
      'Accept':        'application/json',
      'Authorization': 'Bearer ' + (localStorage.getItem('netview_auth_token') ?? ''),
    };
  }

  listado(extra: string = '', busqueda: string = ''): Observable<any> {
    let url = '';
    if (busqueda === '') {
      url = `${this.url}${extra}`;
    } else {
      url = `${this.url}/buscar/${busqueda}${extra}`;
    }
    return new Observable(observer => {
      axios.get(url, { withCredentials: true, headers: this.headers })
        .then(r => { observer.next(r.data); observer.complete(); })
        .catch(e => { observer.error(e);   observer.complete(); });
    });
  }

  // GET content-language/<content_id>/<language_id>/<language_type>
  detalle(contentId: number, languageId: number, languageType: string): Observable<any> {
    const url = `${this.url}/${contentId}/${languageId}/${languageType}`;
    return new Observable(observer => {
      axios.get(url, { withCredentials: true, headers: this.headers })
        .then(r => { observer.next(r.data); observer.complete(); })
        .catch(e => { observer.error(e);   observer.complete(); });
    });
  }

  crear(datos: any): Observable<any> {
    return new Observable(observer => {
      axios.post(this.url, datos, { withCredentials: true, headers: this.headers })
        .then(r => { observer.next(r); observer.complete(); })
        .catch(e => { observer.error(e); observer.complete(); });
    });
  }

  // DELETE content-language/<content_id>/<language_id>/<language_type>
  eliminar(contentId: number, languageId: number, languageType: string): Observable<any> {
    const url = `${this.url}/${contentId}/${languageId}/${languageType}`;
    return new Observable(observer => {
      axios.delete(url, { withCredentials: true, headers: this.headers })
        .then(r => { observer.next(r); observer.complete(); })
        .catch(e => { observer.error(e); observer.complete(); });
    });
  }

  total(busqueda: string = ''): Observable<any> {
    const url = `${this.url}/total/${busqueda}`;
    return new Observable(observer => {
      axios.get(url, { withCredentials: true, headers: this.headers })
        .then(r => { observer.next(r.data); observer.complete(); })
        .catch(e => { observer.error(e);   observer.complete(); });
    });
  }
}
