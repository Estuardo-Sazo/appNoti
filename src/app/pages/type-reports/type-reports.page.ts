import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TypeReport } from 'src/app/interfaces/interfaces';
import { TypeReportService } from 'src/app/services/type-report.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import {AddReportPage} from '../../modal/add-report/add-report.page';

@Component({
  selector: 'app-type-reports',
  templateUrl: './type-reports.page.html',
  styleUrls: ['./type-reports.page.scss'],
})
export class TypeReportsPage implements OnInit {
  typesReport: TypeReport[] = [];
  constructor(
    private typeReportService: TypeReportService,
    public modalController: ModalController,
    private  uiService: UiServiceService,
    public alertController: AlertController,



    ) { }

  ngOnInit() {
   this.getTypeReport();
  }

  getTypeReport(){
    this.typesReport=[];
    this.typeReportService.getTypeReport().subscribe((resp) => {
      this.typesReport.push(...resp.typeReports);
    });

  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: AddReportPage,
      componentProps: { 
        type: 'ADMIN',
      }
    });
    modal.onDidDismiss()
      .then((data) => {
        this.getTypeReport();         
    });
    return await modal.present();
    
  }

  delete(id){
    console.log(id);
    this.alertController.create({
      header: 'Eliminar Tipo de Reporte',
      message: '¿Esta seguro de eliminar este tipo de reporte?',
      buttons: [

        {
          text: 'Eliminar',
          handler: async () => {
            const st=await this.typeReportService.deleteTypeReport({_id:id});

            if(st){
              this.uiService.alertaInfo('Eliminado Correctamente!');
              this.getTypeReport();

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
