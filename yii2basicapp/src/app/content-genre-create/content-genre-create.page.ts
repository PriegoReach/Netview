import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-content-genre-create',
  templateUrl: './content-genre-create.page.html',
  styleUrls: ['./content-genre-create.page.scss'],
  standalone: false,
})
export class ContentGenreCreatePage implements OnInit {

  content_id: number = 0;
  genre_id: number = 0;

  constructor(
    private loadingCtrl: LoadingController,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  async guardar() {
    const loading = await this.loadingCtrl.create({ message: 'Guardando', spinner: 'bubbles' });
    await loading.present();

    await axios({
      method: 'post',
      url: "http://localhost/content-genre",
      withCredentials: true,
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      data: { content_id: Number(this.content_id), genre_id: Number(this.genre_id) }
    }).then(() => {
      this.router.navigate(['/content-genre-list']);
    }).catch(async (error) => {
    const mensaje = error.response?.data?.[0]?.message || 'Error al guardar';
    const alert = await this.alertCtrl.create({
        header: 'Discrepancia',
        message: mensaje,
        buttons: ['OK']
    });
    await alert.present();
});

    loading.dismiss();
  }
}
