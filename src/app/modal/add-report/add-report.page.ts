import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TypeReport } from 'src/app/interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { TypeReportService } from 'src/app/services/type-report.service';


@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.page.html',
  styleUrls: ['./add-report.page.scss'],
})
export class AddReportPage implements OnInit {

  tyepReport: TypeReport={};

  constructor(
    public modalCtrl: ModalController,
    private typeReportService: TypeReportService,

  ) { }

  ngOnInit() {
  }

  async registrar(fRegister:NgForm){
    const creado=await this.typeReportService.createTypeReport(this.tyepReport.name);
    this.tyepReport={};
     this.dismiss(true);
  }

  async dismiss(added = false,data='') {    
    await this.modalCtrl.dismiss({
      'dismissed': true,
      'added': false,
      data
    });
  }

  

}
