import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
const URL = environment.url;

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.page.html',
  styleUrls: ['./search-user.page.scss'],
})
export class SearchUserPage implements OnInit {

  users:Usuario[]=[];
  url: string=URL;
  constructor(public modalCtrl: ModalController,
    private usuarioService: UsuarioService,
    ) { }

  ngOnInit() {
  }
  async dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    await this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
