import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { WatchHistoryEditPage } from '../watch-history-edit/watch-history-edit.page';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-watch-history-detail',
  templateUrl: './watch-history-detail.page.html',
  styleUrls: ['./watch-history-detail.page.scss'],
  standalone: false,
})
export class WatchHistoryDetailPage {

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
    const id = this.route.snapshot.paramMap.get('history_id');
    const loading = await this.loadingCtrl.create({ message: 'Cargando', spinner: 'bubbles' });
    await loading.present();
    await axios({
      method: 'get',
      url: environment.apiUrl + '/watch-history/' + id,
      withCredentials: true,
      headers: { 'Accept': 'application/json' }
    }).then((response) => {
      this.item = response.data;
    }).catch(function (error) { console.log(error); });
    loading.dismiss();
  }

  async editar(id: any) {
    const modal = await this.modalCtrl.create({
      component: WatchHistoryEditPage,
      componentProps: { 'history_id': id },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await modal.present();
    modal.onDidDismiss().then(() => { this.cargarDetalle(); });
  }

  async alertEliminar(id: any) {
    const alert = await this.alertCtrl.create({
      header: 'WatchHistory',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar este registro?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Confirmar', role: 'confirm', handler: () => { this.eliminar(id); } }
      ]
    });
    await alert.present();
  }

  async eliminar(id: any) {
    await axios({
      method: 'delete',
      url: environment.apiUrl + '/watch-history/' + id,
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    }).then(async () => {
      const alert = await this.alertCtrl.create({
        header: 'Eliminado',
        message: 'Registro eliminado correctamente',
        buttons: [{ text: 'Continuar', handler: () => { this.router.navigate(['/watch-history-list']); } }]
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
