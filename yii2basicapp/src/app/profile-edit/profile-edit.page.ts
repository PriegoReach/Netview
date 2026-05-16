import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
  standalone: false,
})
export class ProfileEditPage implements OnInit {

  @Input() profile_id: any;
  user_id: any = null;
  profile_name: any = null;
  is_kids: any = null;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    if (this.profile_id !== undefined) {
      this.getDetalles();
    }
  }

  async getDetalles() {
    await axios({
      method: 'get',
      url: 'http://localhost/profile/' + this.profile_id,
      withCredentials: true,
      headers: { 'Accept': 'application/json' }
    }).then((response) => {
      this.user_id = response.data.user_id;
      this.profile_name = response.data.profile_name;
      this.is_kids = response.data.is_kids;
    }).catch(function (error) { console.log(error); });
  }

  async guardar() {
    const loading = await this.loadingCtrl.create({ message: 'Guardando', spinner: 'bubbles' });
    await loading.present();
    await axios({
      method: 'put',
      url: 'http://localhost/profile/' + this.profile_id,
      withCredentials: true,
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      data: {
        user_id: this.user_id,
        profile_name: this.profile_name,
        is_kids: this.is_kids,
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
