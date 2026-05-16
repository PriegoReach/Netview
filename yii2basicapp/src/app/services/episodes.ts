import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  url: string = `${environment.apiUrl}episode`;
  headers: any = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token') || 'Bearer 100-token'
  };

  constructor() { }

  // Listado de elementos
  listado(extra: string = '', busqueda: string = ''): Observable<any> {
    let url: string = '';
    if (busqueda === '') {
      url = `${this.url}` + extra;
    } else {
      url = `${this.url}/buscar/` + busqueda + extra;
    }
    return new Observable(observer => {
      axios.get(url, {
        withCredentials: true,
        headers: this.headers
      })
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
          observer.complete();
        });
    });
  }

  // Detalle de un elemento
  detalle(id: string | null = '', extra: string = ''): Observable<any> {
    const url = `${this.url}/` + id + extra;
    return new Observable(observer => {
      axios.get(url, {
        withCredentials: true,
        headers: this.headers
      })
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
          observer.complete();
        });
    });
  }

  // Crear un elemento
  crear(episode: any): Observable<any> {
    const url = `${this.url}`;
    return new Observable(observer => {
      axios.post(url, episode, {
        withCredentials: true,
        headers: this.headers
      })
        .then(response => {
          observer.next(response);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
          observer.complete();
        });
    });
  }

  // Actualizar un elemento
  actualizar(id: string, episode: any): Observable<any> {
    const url = `${this.url}/${id}`;
    return new Observable(observer => {
      axios.put(url, episode, {
        withCredentials: true,
        headers: this.headers
      })
        .then(response => {
          observer.next(response);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
          observer.complete();
        });
    });
  }

  // Eliminar un elemento
  eliminar(id: string): Observable<any> {
    const url = `${this.url}/${id}`;
    return new Observable(observer => {
      axios.delete(url, {
        withCredentials: true,
        headers: this.headers
      })
        .then(response => {
          observer.next(response);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
          observer.complete();
        });
    });
  }

  // Contar el total de elementos
  total(busqueda: string = ''): Observable<any> {
    const url = `${this.url}/total/` + busqueda;
    return new Observable(observer => {
      axios.get(url, {
        withCredentials: true,
        headers: this.headers
      })
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
          observer.complete();
        });
    });
  }
}
