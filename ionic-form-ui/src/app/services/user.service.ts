import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private alertController: AlertController) { }

  async popupAlert(text) {
    const alert = await this.alertController.create({
      header: text,
      buttons: ['OK']
    });

    return await alert.present();
  }
}
