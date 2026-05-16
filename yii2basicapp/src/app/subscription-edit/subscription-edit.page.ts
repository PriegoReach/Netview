import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-subscription-edit',
  templateUrl: './subscription-edit.page.html',
  styleUrls: ['./subscription-edit.page.scss'],
  standalone: false,
})
export class SubscriptionEditPage implements OnInit {

  @Input() subscription_id: any;
  user_id: any = null;
  plan_id: any = null;
  start_date: any = null;
  end_date: any = null;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    if (this.subscription_id !== undefined) {
      this.getDetalles();
    }
  }

  async getDetalles() {
    await axios({
      method: 'get',
      url: 'http://localhost/subscription/' + this.subscription_id,
      withCredentials: true,
      headers: { 'Accept': 'application/json' }
    }).then((response) => {
      this.user_id = response.data.user_id;
      this.plan_id = response.data.plan_id;
      this.start_date = response.data.start_date;
      this.end_date = response.data.end_date;
    }).catch(function (error) { console.log(error); });
  }

  async guardar() {
    const loading = await this.loadingCtrl.create({ message: 'Guardando', spinner: 'bubbles' });
    await loading.present();
    await axios({
      method: 'put',
      url: 'http://localhost/subscription/' + this.subscription_id,
      withCredentials: true,
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      data: {
        user_id: this.user_id,
        plan_id: this.plan_id,
        start_date: this.start_date,
        end_date: this.end_date,
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
