import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-rating-edit',
  templateUrl: './rating-edit.page.html',
  styleUrls: ['./rating-edit.page.scss'],
  standalone: false,
})
export class RatingEditPage implements OnInit {

  @Input() rating_id: any;
  profile_id: any = null;
  content_id: any = null;
  score: any = null;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    if (this.rating_id !== undefined) {
      this.getDetalles();
    }
  }

  async getDetalles() {
    await axios({
      method: 'get',
      url: 'http://localhost/rating/view?id=' + this.rating_id,
      withCredentials: true,
      headers: { 'Accept': 'application/json' }
    }).then((response) => {
      this.profile_id = response.data.profile_id;
      this.content_id = response.data.content_id;
      this.score = response.data.score;
    }).catch(function (error) { console.log(error); });
  }

  async guardar() {
    const loading = await this.loadingCtrl.create({ message: 'Guardando', spinner: 'bubbles' });
    await loading.present();
    await axios({
      method: 'put',
      url: 'http://localhost/rating/' + this.rating_id,
      withCredentials: true,
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      data: {
        profile_id: this.profile_id,
        content_id: this.content_id,
        score: this.score,
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
