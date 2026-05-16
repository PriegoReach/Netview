import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import axios from 'axios';

@Component({
  selector: 'app-content-genre-edit',
  templateUrl: './content-genre-edit.page.html',
  styleUrls: ['./content-genre-edit.page.scss'],
  standalone: false,
})
export class ContentGenreEditPage implements OnInit {

  @Input() content_id: number | undefined;
  @Input() genre_id_original: number | undefined;
  genre_id: number = 0;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    if (this.genre_id_original !== undefined) {
      this.genre_id = this.genre_id_original;
    }
  }

  async guardar() {
    const loading = await this.loadingCtrl.create({ message: 'Guardando', spinner: 'bubbles' });
    await loading.present();
    try {
      // Eliminar el registro actual
      await axios({
        method: 'delete',
        url: environment.apiUrl + 'content-genre/eliminar/' + this.content_id + '/' + this.genre_id_original,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      });
      // Crear el nuevo registro
      await axios({
        method: 'post',
        url: environment.apiUrl + 'content-genre',
        withCredentials: true,
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        data: { content_id: Number(this.content_id), genre_id: Number(this.genre_id) }
      });
      const alert = await this.alertCtrl.create({
        header: 'Éxito',
        message: 'Registro actualizado correctamente',
        buttons: ['OK']
      });
      await alert.present();
      this.modalCtrl.dismiss();
    } catch (error: any) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: error.response?.data?.[0]?.message || 'Error al actualizar',
        buttons: ['OK']
      });
      await alert.present();
    }
    loading.dismiss();
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}