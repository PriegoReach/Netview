import { Component, Input } from '@angular/core';

   @Component({
     selector: 'app-toolbar',
     templateUrl: './toolbar.component.html',
     styleUrls: ['./toolbar.component.scss'],
     standalone: false
   })
   export class ToolbarComponent {

     @Input('titulo') titulo: string | undefined;

     constructor() { }

   }