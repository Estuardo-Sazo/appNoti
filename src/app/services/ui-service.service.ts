import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UiServiceService {
  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  async alertaInfo(message: string) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async alertaInfoAction(message: string, title: string = '', accion) {
    const alert = await this.alertController.create({
      header: title,
      message,
      buttons: [
        {
          text: 'OK',
          handler: accion,
        },
      ],
    });

    await alert.present();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      position: 'top',
      duration: 2000,
    });
    toast.present();
  }
}
