import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import axios from 'axios';
import { environment } from 'src/environments/environment'; 
@Component({
  selector: 'app-season-edit',
  templateUrl: './season-edit.page.html',
  styleUrls: ['./season-edit.page.scss'],
  standalone: false,
})
export class SeasonEditPage implements OnInit {

  @Input() season_id: any;
  content_id: any = null;
  season_number: any = null;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    if (this.season_id !== undefined) {
      this.getDetalles();
    }
  }

  async getDetalles() {
    await axios({
      method: 'get',
      // getDetalles()
      url: environment.apiUrl + 'season/' + this.season_id,
      withCredentials: true,
      headers: { 'Accept': 'application/json' }
    }).then((response) => {
      this.content_id = response.data.content_id;
      this.season_number = response.data.season_number;
    }).catch(function (error) { console.log(error); });
  }

  async guardar() {
    const loading = await this.loadingCtrl.create({ message: 'Guardando', spinner: 'bubbles' });
    await loading.present();
    await axios({
      method: 'put',
      url: 'http://localhost/season/' + this.season_id,
      withCredentials: true,
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      data: {
        content_id: this.content_id,
        season_number: this.season_number,
      }
    }).then(async () => {
      const alert = await this.alertCtrl.create({
        header: 'Éxito',
        message: 'Registro actualizado correctamente',
        buttons: ['OK']
      });
      await alert.present();
      this.modalCtrl.dismiss();
    }).catch(async (error) => {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: error.response?.data?.[0]?.message || 'Error al actualizar',
        buttons: ['OK']
      });
      await alert.present();
    });
    loading.dismiss();
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}
