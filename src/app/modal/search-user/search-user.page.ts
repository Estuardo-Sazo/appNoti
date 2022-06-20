import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
const URL = environment.url;

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.page.html',
  styleUrls: ['./search-user.page.scss'],
})
export class SearchUserPage implements OnInit {
  type;
  userL;


  users:Usuario[]=[];
  url: string=URL;
  constructor(public modalCtrl: ModalController,
    private usuarioService: UsuarioService,
    public alertController: AlertController,
    private  uiService: UiServiceService,
    ) { }

  ngOnInit() {
    this.userL = this.usuarioService.getUsuario();
    
  }
  async dismiss(added = false,data='') {    
    await this.modalCtrl.dismiss({
      'dismissed': true,
      'added': false,
      data
    });
  }

  search(event) {
    const search = event.detail.value;
    if (search.length>0) {
      this.usuarioService.getListUsersSearch(search,this.type).subscribe((resp) => {
        this.users=[];
        this.users.push(...resp.users);

      });
    }
    
  }
  


  addUser(id){
    this.alertController.create({
      header: `Agregar Usuario a ${this.type=='ADMIN'?'Adminstrador':'Editor'}`,
      message: `¿Esta seguro de agregar este usuario a rol de ${this.type=='ADMIN'?'Adminstrador':'Editor'}?`,
      buttons: [

        {
          text: 'Agregar',
          handler: async () => {
            const st=true //await this.commentsService.deleteComment(id);

            if(st){
              this.uiService.alertaInfo('Agregado Correctamente!');
              this.dismiss(true,id);
              

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
}
