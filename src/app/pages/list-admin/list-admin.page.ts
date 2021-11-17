import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import {SearchUserPage} from '../../modal/search-user/search-user.page';
const URL = environment.url;
@Component({
  selector: 'app-list-admin',
  templateUrl: './list-admin.page.html',
  styleUrls: ['./list-admin.page.scss'],
})
export class ListAdminPage implements OnInit {
  users:Usuario[]=[];
  url: string=URL;
  constructor(
    private usuarioService: UsuarioService,
    public alertController: AlertController,
    private  uiService: UiServiceService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.usuarioService.getListUsers('ADMIN').subscribe((resp)=>{
      this.users.push(...resp.users);
    });
    console.log(this.users);
    
  }
  

  delete(id){
    console.log(id);
    this.alertController.create({
      header: 'Eliminar Usuario Adminstrador',
      message: '¿Esta seguro de eliminar este usuario de su lista de administradores?',
      buttons: [

        {
          text: 'Eliminar',
          handler: async () => {
            const st=true //await this.commentsService.deleteComment(id);

            if(st){
              this.uiService.alertaInfo('Eliminado Correctamente!');

            }else{
              this.uiService.alertaInfo('Error al eliminar, vuelve  a intentarlo');
            }
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancelado');
          }
        }
      ]
    }).then(res => {
      res.present();
    });
    
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SearchUserPage,
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data['data']);
         // Here's your selected user!
    });
    return await modal.present();
    
  }


}
