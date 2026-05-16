import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import axios from 'axios';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-episode-edit',
  templateUrl: './episode-edit.page.html',
  styleUrls: ['./episode-edit.page.scss'],
  standalone: false,
})
export class EpisodeEditPage implements OnInit {

  @Input() episode_id: number | undefined;
  season_id: number | null = null;
  episode_number: number | null = null;
  duration_minutes: number | null = null;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    if (this.episode_id !== undefined) {
      this.getDetalles();
    }
  }

  async getDetalles() {
    await axios({
      method: 'get',
      url: environment.apiUrl + 'episode/' + this.episode_id,
      withCredentials: true,
      headers: { 'Accept': 'application/json' }
    }).then((response) => {
      this.season_id = response.data.season_id;
      this.episode_number = response.data.episode_number;
      this.duration_minutes = response.data.duration_minutes;
    }).catch(function (error) {
      console.log(error);
    });
  }

  async guardar() {
    const loading = await this.loadingCtrl.create({ message: 'Guardando', spinner: 'bubbles' });
    await loading.present();
    await axios({
      method: 'put',
      url: environment.apiUrl + 'episode/' + this.episode_id,
      withCredentials: true,
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      data: {
        season_id: this.season_id,
        episode_number: this.episode_number,
        duration_minutes: this.duration_minutes
      }
    }).then(async () => {
      const alert = await this.alertCtrl.create({
        header: 'Éxito',
        message: 'Episodio actualizado correctamente',
        buttons: ['OK']
      });
      await alert.present();
      this.modalCtrl.dismiss();
    }).catch(async (error) => {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: error.response?.data?.[0]?.message || 'Error al actualizar',
        buttons: ['OK']
      });
      await alert.present();
    });
    loading.dismiss();
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}
