import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-watch-history-create',
  templateUrl: './watch-history-create.page.html',
  styleUrls: ['./watch-history-create.page.scss'],
  standalone: false,
})
export class WatchHistoryCreatePage {

  profile_id: any = null;
  content_id: any = null;
  episode_id: any = null;
  watched_seconds: any = null;

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
      url: 'http://localhost/watch-history',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      data: {
        profile_id: this.profile_id,
        content_id: this.content_id,
        episode_id: this.episode_id,
        watched_seconds: this.watched_seconds,
      }
    }).then(() => {
      this.router.navigate(['/watch-history-list']);
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
