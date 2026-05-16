import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-subscription-plan-create',
  templateUrl: './subscription-plan-create.page.html',
  styleUrls: ['./subscription-plan-create.page.scss'],
  standalone: false,
})
export class SubscriptionPlanCreatePage {

  plan_name: any = null;
  price: any = null;

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
      url: 'http://localhost/subscription-plan',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      data: {
        plan_name: this.plan_name,
        price: parseFloat(this.price),
      }
    }).then(() => {
      this.router.navigate(['/subscription-plan-list']);
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