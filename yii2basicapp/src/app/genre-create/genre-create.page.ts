import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import axios from 'axios';

@Component({
  selector: 'app-genre-create',
  templateUrl: './genre-create.page.html',
  styleUrls: ['./genre-create.page.scss'],
  standalone: false,
})
export class GenreCreatePage {

  genre_name: string = '';

  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  async guardar() {
    const loading = await this.loadingCtrl.create({ message: 'Guardando', spinner: 'bubbles' });
    await loading.present();
    await axios({
      method: 'post',
      url: environment.apiUrl + 'genre',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      data: { genre_name: this.genre_name }
    }).then(() => {
      this.router.navigate(['/genre-list']);
    }).catch(async (error) => {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: error.response?.data?.[0]?.message || 'Error al guardar',
        buttons: ['OK']
      });
      await alert.present();
    });
    loading.dismiss();
  }
}