import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-rating-create',
  templateUrl: './rating-create.page.html',
  styleUrls: ['./rating-create.page.scss'],
  standalone: false,
})
export class RatingCreatePage {

  profile_id: any = null;
  content_id: any = null;
  score: any = null;

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
      url: 'http://localhost/rating',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      data: {
        profile_id: this.profile_id,
        content_id: this.content_id,
        score: this.score,
      }
    }).then(() => {
      this.router.navigate(['/rating-list']);
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
