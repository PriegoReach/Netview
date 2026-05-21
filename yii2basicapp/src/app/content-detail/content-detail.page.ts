import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { ContentEditPage } from '../content-edit/content-edit.page';
import { environment } from 'src/environments/environment';
import axios from 'axios';

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.page.html',
  styleUrls: ['./content-detail.page.scss'],
  standalone: false,
})
export class ContentDetailPage {

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

  /**
   * Simbología de tipo de contenido (Manual de Identidad):
   * mapea content_type a la clase de insignia serie / kids / película.
   */
  tipoBadgeClass(tipo: string): string {
    const t = (tipo || '').toLowerCase();
    if (t.includes('serie')) { return 'nv-badge--serie'; }
    if (t.includes('kid') || t.includes('infantil')) { return 'nv-badge--kids'; }
    return 'nv-badge--pelicula';
  }

  async cargarDetalle() {
    const id = this.route.snapshot.paramMap.get('content_id');
    const loading = await this.loadingCtrl.create({ message: 'Cargando', spinner: 'bubbles' });
    await loading.present();
    await axios({
      method: 'get',
      url: environment.apiUrl + '/content/' + id,
      withCredentials: true,
      headers: { 'Accept': 'application/json' }
    }).then((response) => {
      this.item = response.data;
    }).catch(function (error) { console.log(error); });
    loading.dismiss();
  }

  async editar(id: any) {
    const modal = await this.modalCtrl.create({
      component: ContentEditPage,
      componentProps: { 'content_id': id },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await modal.present();
    modal.onDidDismiss().then(() => { this.cargarDetalle(); });
  }

  async alertEliminar(id: any) {
    const alert = await this.alertCtrl.create({
      header: 'Content',
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
      url: environment.apiUrl + '/content/' + id,
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    }).then(async () => {
      const alert = await this.alertCtrl.create({
        header: 'Eliminado',
        message: 'Registro eliminado correctamente',
        buttons: [{ text: 'Continuar', handler: () => { this.router.navigate(['/content-list']); } }]
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