import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss'],
  standalone: false
})
export class ContentCardComponent {

  @Input('titulo')       titulo:       string | undefined;
  @Input('portada')      portada:      string | undefined;
  @Input('tipo')         tipo:         string | undefined;
  @Input('anio')         anio:         number | undefined;
  @Input('calificacion') calificacion: number | undefined;

  constructor() { }

  /**
   * Simbología de tipo de contenido (Manual de Identidad).
   * Mapea el valor crudo a una clase de insignia: serie / pelicula / kids.
   */
  get tipoBadgeClass(): string {
    const t = (this.tipo || '').toLowerCase();
    if (t.includes('serie')) { return 'nv-badge--serie'; }
    if (t.includes('kid') || t.includes('infantil')) { return 'nv-badge--kids'; }
    return 'nv-badge--pelicula';   // Movie por defecto
  }

}
