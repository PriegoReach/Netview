import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { ContentLanguageEditPage } from '../content-language-edit/content-language-edit.page';
import axios from 'axios';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-content-language-detail',
  templateUrl: './content-language-detail.page.html',
  styleUrls: ['./content-language-detail.page.scss'],
  standalone: false,
})
export class ContentLanguageDetailPage {

  item: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    this.cargarDetalle();
  }

  async cargarDetalle() {
    const content_id = this.route.snapshot.paramMap.get('content_id');
    const language_id = this.route.snapshot.paramMap.get('language_id');
    const language_type = this.route.snapshot.paramMap.get('language_type');
    const loading = await this.loadingCtrl.create({ message: 'Cargando', spinner: 'bubbles' });
    await loading.present();
    await axios({
      method: 'get',
      url: environment.apiUrl + '/content-language/' + content_id + '/' + language_id + '/' + language_type,
      withCredentials: true,
      headers: { 'Accept': 'application/json' }
    }).then((response) => {
      this.item = response.data;
    }).catch(function (error) { console.log(error); });
    loading.dismiss();
}

async alertEliminar(content_id: any, language_id: any, language_type: any) {
    const alert = await this.alertCtrl.create({
      header: 'Content Language',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar este registro?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Confirmar', role: 'confirm', handler: () => { this.eliminar(content_id, language_id, language_type); } }
      ]
    });
    await alert.present();
}

async eliminar(content_id: any, language_id: any, language_type: any) {
    await axios({
      method: 'delete',
      url: environment.apiUrl + '/content-language/' + content_id + '/' + language_id + '/' + language_type,
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    }).then(async () => {
      const alert = await this.alertCtrl.create({
        header: 'Eliminado',
        message: 'Registro eliminado correctamente',
        buttons: [{ text: 'Continuar', handler: () => { this.router.navigate(['/content-language-list']); } }]
      });
      await alert.present();
    }).catch(async (error) => {
      const msg = error.response?.status === 500
        ? 'No puedes eliminar este registro porque tiene datos asociados.'
        : error.response?.data?.[0]?.message || 'Error al eliminar';
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: msg,
        buttons: ['OK']
      });
      await alert.present();
    });
}
}
