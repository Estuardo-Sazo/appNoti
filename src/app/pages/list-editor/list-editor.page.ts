import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import {SearchUserPage} from '../../modal/search-user/search-user.page';

const URL = environment.url;

@Component({
  selector: 'app-list-editor',
  templateUrl: './list-editor.page.html',
  styleUrls: ['./list-editor.page.scss'],
})
export class ListEditorPage implements OnInit {
  users:Usuario[]=[];
  url: string=URL;
  userL;

  constructor(
    private usuarioService: UsuarioService,
    public alertController: AlertController,
    private  uiService: UiServiceService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.userL = this.usuarioService.getUsuario();
    this.getUser();
  }


  getUser(){
    this.users=[];
    console.log('Consltando usuarios');
    
    this.usuarioService.getListUsers('EDITOR').subscribe((resp)=>{
      this.users.push(...resp.users);
    });
  }

  delete(id){
    console.log(id);
    this.alertController.create({
      header: 'Eliminar Usuario Adminstrador',
      message: '¿Esta seguro de eliminar este usuario de su lista de editores?',
      buttons: [

        {
          text: 'Quitar',
          handler: async () => {
            const st=await this.usuarioService.actualizarRole({userId:id,role:'USER'});

            if(st){
              this.uiService.alertaInfo('Quitado Correctamente!');
              this.getUser();

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
      componentProps: { 
        type: 'EDITOR',
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data['data']);
        const id = data['data'].data;
        this.updateRole(id,'EDITOR');

         
    });
    return await modal.present();
    
  }

  async updateRole(id,role){
    console.log(id,role);
    const data={
      userId:id,
      role
    }
    const actulizado = await this.usuarioService.actualizarRole(data);
    if (actulizado) {
      this.getUser();
    }
    
  }

}
