import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Report, Usuario } from 'src/app/interfaces/interfaces';
import { ReportsService } from 'src/app/services/reports.service';
import { environment } from 'src/environments/environment';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import {AddCommentPage} from '../add-comment/add-comment.page';
import { CommentsService } from 'src/app/services/comments.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
const URL = environment.url;
@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  user: Usuario={};
  userl: Usuario={};

  comments= [];
  report: Report={
    imgs:[],
    user:this.user,
    type:{}
  };
  imgsR: string[]=[];
  reportId;
  slideSoloOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  };
  url: string=URL;
  imageProfile:String;
  constructor( private reportsService: ReportsService,
    private router: ActivatedRoute,
    public modalController: ModalController,
    private commentsService: CommentsService,
    private usuarioService: UsuarioService,
    public alertController: AlertController,
    private navCtrl: NavController,
    private  uiService: UiServiceService

    ) {

    this.reportId = this.router.snapshot.paramMap.get('idReport');

  }
  async ngOnInit() {
   
    this.reportsService.getReport(this.reportId).subscribe((data) => {
      this.report=data.report[0];
      this.user=this.report.user;
      this.imgsR.push(...this.report.imgs);

      });
      this.userl = this.usuarioService.getUsuario();
      this.imageProfile=this.usuarioService.getURL(this.userl._id,this.userl.image);
      this.commentsService.getComments(this.reportId).subscribe((resp)=>{
        this.comments.push(...resp.comments);
        console.log(this.comments);
      });

      this.commentsService.newComment.subscribe((comment)=>{
        this.comments.push(comment);
      });

      this.commentsService.delComment.subscribe((rep: any)=>{
        console.log(rep);

        this.comments= this.comments.filter(c=> c._id !== rep._id);
      });

  }

  async openModal(){
    const modal = await this.modalController.create({
      component: AddCommentPage,
      cssClass: 'my-custom-class',
      componentProps:{
        report:this.report
      }
    });
    return await modal.present();
  }
  showConfirm(id) {
    this.alertController.create({
      header: 'Eliminar Reporte',
      message: '¿Esta seguro de eliminar este reporte?',
      buttons: [

        {
          text: 'Eliminar',
          handler: async () => {
            const st= await this.reportsService.deleteReport(id);
            console.log(st);
            if(st){
              this.navCtrl.navigateRoot('/main/tabs/tab4');
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
