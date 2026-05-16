import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-subscription-create',
  templateUrl: './subscription-create.page.html',
  styleUrls: ['./subscription-create.page.scss'],
  standalone: false,
})
export class SubscriptionCreatePage {

  user_id: any = null;
  plan_id: any = null;
  start_date: any = null;
  end_date: any = null;

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
      url: 'http://localhost/subscription',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      data: {
        user_id: Number(this.user_id),
        plan_id: Number(this.plan_id),
        start_date: this.start_date,
        end_date: this.end_date || null,
      }
    }).then(() => {
      this.router.navigate(['/subscription-list']);
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