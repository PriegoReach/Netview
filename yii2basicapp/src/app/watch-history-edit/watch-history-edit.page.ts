import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-watch-history-edit',
  templateUrl: './watch-history-edit.page.html',
  styleUrls: ['./watch-history-edit.page.scss'],
  standalone: false,
})
export class WatchHistoryEditPage implements OnInit {

  @Input() history_id: any;
  profile_id: any = null;
  content_id: any = null;
  episode_id: any = null;
  watched_seconds: any = null;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    if (this.history_id !== undefined) {
      this.getDetalles();
    }
  }

  async getDetalles() {
    await axios({
      method: 'get',
      url: 'http://localhost/watch-history/' + this.history_id,
      withCredentials: true,
      headers: { 'Accept': 'application/json' }
    }).then((response) => {
      this.profile_id = response.data.profile_id;
      this.content_id = response.data.content_id;
      this.episode_id = response.data.episode_id;
      this.watched_seconds = response.data.watched_seconds;
    }).catch(function (error) { console.log(error); });
  }

  async guardar() {
    const loading = await this.loadingCtrl.create({ message: 'Guardando', spinner: 'bubbles' });
    await loading.present();
    await axios({
      method: 'put',
      url: 'http://localhost/watch-history/' + this.history_id,
      withCredentials: true,
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      data: {
        profile_id: this.profile_id,
        content_id: this.content_id,
        episode_id: this.episode_id,
        watched_seconds: this.watched_seconds,
      }
    }).then(async () => {
      const alert = await this.alertCtrl.create({
        header: 'Éxito',
        message: 'Registro actualizado correctamente',
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
