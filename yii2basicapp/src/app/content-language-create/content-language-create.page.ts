import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-content-language-create',
  templateUrl: './content-language-create.page.html',
  styleUrls: ['./content-language-create.page.scss'],
  standalone: false,
})
export class ContentLanguageCreatePage {

  content_id: any = null;
  language_id: any = null;
  language_type: any = null;

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
      url: 'http://localhost/content-language',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      data: {
        content_id: this.content_id,
        language_id: this.language_id,
        language_type: this.language_type,
      }
    }).then(() => {
      this.router.navigate(['/content-language-list']);
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
