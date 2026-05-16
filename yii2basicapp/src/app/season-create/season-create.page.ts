import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import axios from 'axios';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-season-create',
  templateUrl: './season-create.page.html',
  styleUrls: ['./season-create.page.scss'],
  standalone: false,
})
export class SeasonCreatePage {

  content_id: any = null;
  season_number: any = null;

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
      url: environment.apiUrl + 'season',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      data: {
        content_id: this.content_id,
        season_number: this.season_number,
      }
    }).then(() => {
      this.router.navigate(['/season-list']);
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
