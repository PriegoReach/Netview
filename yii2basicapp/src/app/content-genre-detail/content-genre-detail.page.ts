import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { ContentGenreEditPage } from '../content-genre-edit/content-genre-edit.page';
import axios from 'axios';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-content-genre-detail',
  templateUrl: './content-genre-detail.page.html',
  styleUrls: ['./content-genre-detail.page.scss'],
  standalone: false,
})
export class ContentGenreDetailPage {

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
    const genre_id = this.route.snapshot.paramMap.get('genre_id');
    const loading = await this.loadingCtrl.create({ message: 'Cargando', spinner: 'bubbles' });
    await loading.present();
    await axios({
      method: 'get',
      url: environment.apiUrl + '/content-genre/buscar/' + content_id + '/' + genre_id,
      withCredentials: true,
      headers: { 'Accept': 'application/json' }
    }).then((response) => {
      this.item = response.data;
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

  async editar(content_id: number, genre_id: number) {
    const modal = await this.modalCtrl.create({
      component: ContentGenreEditPage,
      componentProps: { 
        'content_id': content_id,
        'genre_id_original': genre_id
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await modal.present();
    modal.onDidDismiss().then(() => { this.cargarDetalle(); });
}

  async alertEliminar(content_id: number, genre_id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Content Genre',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar este registro?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => { this.eliminar(content_id, genre_id); }
        }
      ]
    });
    await alert.present();
  }

  async eliminar(content_id: number, genre_id: number) {
    await axios({
      method: 'delete',
      url: environment.apiUrl + '/content-genre/eliminar/' + content_id + '/' + genre_id,
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    }).then(async (response) => {
      const alert = await this.alertCtrl.create({
        header: 'Eliminado',
        message: 'Registro eliminado correctamente',
        buttons: [{
          text: 'Continuar',
          handler: () => { this.router.navigate(['/content-genre-list']); }
        }]
      });
      await alert.present();
    }).catch(async (error) => {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: error.response?.data?.[0]?.message || 'Error al eliminar',
        buttons: ['OK']
      });
      await alert.present();
    });
  }
}
