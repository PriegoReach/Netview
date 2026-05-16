import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SeasonService {

  private url: string = `${environment.apiUrl}/season`;

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

  detalle(id: string | number | null = '', extra: string = ''): Observable<any> {
    const url = `${this.url}/${id}${extra}`;
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

  actualizar(id: string | number, datos: any): Observable<any> {
    const url = `${this.url}/${id}`;
    return new Observable(observer => {
      axios.put(url, datos, { withCredentials: true, headers: this.headers })
        .then(r => { observer.next(r); observer.complete(); })
        .catch(e => { observer.error(e); observer.complete(); });
    });
  }

  eliminar(id: string | number): Observable<any> {
    const url = `${this.url}/${id}`;
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
