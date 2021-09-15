import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(private alertController: AlertController,
    private toastController: ToastController
  ) { }

  async alertaInfo(message:string) {
    const alert = await this.alertController.create({   
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
  
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    toast.present();
  }

}
