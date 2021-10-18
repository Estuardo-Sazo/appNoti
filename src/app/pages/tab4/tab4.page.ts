import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Report } from 'src/app/interfaces/interfaces';
import { ReportPage } from 'src/app/modal/report/report.page';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  reports: Report[] = [];
  habilitado = true;
  constructor(
    private reportsService: ReportsService,
    private router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.siguientes();
    this.reportsService.newReport.subscribe((report) => {
      this.reports.unshift(report);
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

  reporView(report){
   
    this.router.navigateByUrl('/report/'+report._id);

  }

  addReport() {
   // this.router.navigate(['/newreport/']);
    this.router.navigateByUrl('/newreport/');

  }

  recargar(event) {
    this.siguientes(event, true);
    this.habilitado = true;
    this.reports = [];
  }

  siguientes(event?, pull: boolean = false) {
    this.reportsService.getReports().subscribe((resp) => {
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
