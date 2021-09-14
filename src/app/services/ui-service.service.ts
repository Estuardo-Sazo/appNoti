import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(private alertController: AlertController) { }

  async alertaInfo(message:string) {
    const alert = await this.alertController.create({   
      message,
      buttons: ['OK']
    });

    await alert.present();
}

}
