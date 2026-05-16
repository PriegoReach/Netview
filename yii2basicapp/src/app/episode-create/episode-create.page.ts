import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import axios from 'axios';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-episode-create',
  templateUrl: './episode-create.page.html',
  styleUrls: ['./episode-create.page.scss'],
  standalone: false,
})
export class EpisodeCreatePage {

  season_id: number | null = null;
  episode_number: number | null = null;
  duration_minutes: number | null = null;

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
      url: environment.apiUrl + 'episode',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      data: {
        season_id: this.season_id,
        episode_number: this.episode_number,
        duration_minutes: this.duration_minutes
      }
    }).then(() => {
      this.router.navigate(['/episode-list']);
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
