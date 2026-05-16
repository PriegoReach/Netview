import { NgModule } from '@angular/core';
   import { CommonModule } from '@angular/common';
   import { IonicModule } from '@ionic/angular';
   import { ContentCardComponent } from './content-card.component';

   @NgModule({
     declarations: [ContentCardComponent],
     imports: [
       CommonModule,
       IonicModule
     ],
     exports: [ContentCardComponent]
   })
   export class ContentCardModule {}