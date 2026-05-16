import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-profile-create',
  templateUrl: './profile-create.page.html',
  styleUrls: ['./profile-create.page.scss'],
  standalone: false,
})
export class ProfileCreatePage {

  user_id: any = null;
  profile_name: any = null;
  is_kids: any = null;

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
      url: 'http://localhost/profile',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      data: {
        user_id: this.user_id,
        profile_name: this.profile_name,
        is_kids: this.is_kids,
      }
    }).then(() => {
      this.router.navigate(['/profile-list']);
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
