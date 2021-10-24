import { Component, Input, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { CommentsService } from 'src/app/services/comments.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
const URL = environment.url;

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment[];
  url:string=URL;
  user:Usuario={};

  constructor(

    private usuarioService: UsuarioService,
    private commentsService:CommentsService,
    public alertController: AlertController,
    private  uiService:UiServiceService,
    private navCtrl: NavController,



  ) { }

  ngOnInit() {
    console.log(this.comment);
    this.user = this.usuarioService.getUsuario();
    
  }

  showConfirm(id) {
    this.alertController.create({
      header: 'Eliminar Reporte',
      message: '¿Esta seguro de eliminar este reporte?',
      buttons: [
        
        {
          text: 'Eliminar',
          handler: async () => {
            const st= await this.commentsService.deleteComment(id);
           
            if(st){
              this.uiService.alertaInfo("Eliminado Correctamente!")

            }else{
              this.uiService.alertaInfo("Error al eliminar, vuelve  a intentarlo")

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
