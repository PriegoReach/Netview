import { Component, Input } from '@angular/core';

   @Component({
     selector: 'app-content-card',
     templateUrl: './content-card.component.html',
     styleUrls: ['./content-card.component.scss'],
     standalone: false
   })
   export class ContentCardComponent {

     @Input('titulo')      titulo:      string | undefined;
     @Input('portada')     portada:     string | undefined;
     @Input('tipo')        tipo:        string | undefined;
     @Input('anio')        anio:        number | undefined;
     @Input('calificacion') calificacion: number | undefined;

     constructor() { }

   }