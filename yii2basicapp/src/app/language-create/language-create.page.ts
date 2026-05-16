import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-language-create',
  templateUrl: './language-create.page.html',
  styleUrls: ['./language-create.page.scss'],
  standalone: false,
})
export class LanguageCreatePage {

  language_name: any = null;

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
      url: 'http://localhost/language',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      data: {
        language_name: this.language_name,
      }
    }).then(() => {
      this.router.navigate(['/language-list']);
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
