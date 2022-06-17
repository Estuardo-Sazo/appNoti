import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Report, Usuario } from 'src/app/interfaces/interfaces';
import { ReportPage } from 'src/app/modal/report/report.page';
import { CommentsService } from 'src/app/services/comments.service';
import { ReportsService } from 'src/app/services/reports.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  reports: Report[] = [];
  habilitado = true;
  user: Usuario = {
  };

  constructor(
    private usuarioService: UsuarioService,
    private reportsService: ReportsService,
    private router: Router,
    private modalController: ModalController,
    private uiService: UiServiceService,
    private commentsService: CommentsService,
 

  ) { }

  ngOnInit() {
    this.user = this.usuarioService.getUsuario();
    console.log(this.user);
    if (this.user.phone == '' || this.user.cui == '') {
      this.uiService.alertaInfoAction('Para poder crear un reporte, debes completar tu información (Teléfono y CUI)', 'Completar información', () => {
        this.router.navigate(['/main/tabs/tab3']);

      });
    } else {
      this.reportsService.pagina = 0;
      this.siguientes();

    }


    this.reportsService.newReport.subscribe((report) => {
      this.reports.unshift(report);
    });

    this.reportsService.delReport.subscribe((rep) => {
      this.reports = this.reports.filter(r => r._id !== rep._id);
    });

  }

  async openModal(report) {
    const modal = await this.modalController.create({
      componentProps: { report },
      swipeToClose: true,
      component: ReportPage,
    });
    return await modal.present();
  }

  reporView(report) {

    this.router.navigateByUrl('/report/' + report._id);

  }

  addReport() {
    this.user = this.usuarioService.getUsuario();
    console.log(this.user);

    if (this.user.phone == '' || this.user.cui == '') {
      this.uiService.alertaInfoAction('Para poder crear un reporte, debes completar tu información (Teléfono y CUI)', 'Completar información', () => {
        this.router.navigate(['/main/tabs/tab3']);
      });
    } else {

      this.router.navigate(['/newreport/']);

    }

  }

  recargar(event) {
    this.siguientes(event, true);
    this.habilitado = true;
    this.reports = [];
  }

  siguientes(event?, pull: boolean = false) {
    this.reportsService.getReports(pull).subscribe((resp) => {
      console.log(resp);
      this.reports.push(...resp.reports);

      if (event) {
        event.target.complete();
        console.log(this.reports);

        if (resp.reports.length === 0) {
          this.habilitado = false;
        }
      }
    });
  }


}
