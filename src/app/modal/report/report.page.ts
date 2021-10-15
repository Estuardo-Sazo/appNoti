import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Report } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  @Input() report: Report;
           
  constructor( private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.report);
       
  }

 async closeModal(){
 
    await this.modalController.dismiss();

}
}