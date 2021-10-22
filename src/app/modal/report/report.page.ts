import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Report, Usuario } from 'src/app/interfaces/interfaces';
import { ReportsService } from 'src/app/services/reports.service';
import { environment } from 'src/environments/environment';
import { ModalController } from '@ionic/angular';
import {AddCommentPage} from '../add-comment/add-comment.page';
import { CommentsService } from 'src/app/services/comments.service';
const URL = environment.url;
@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  user:Usuario={};
  comments= [];
  report:Report={
    imgs:[],
    user:this.user,
    type:{}
  };
  imgsR:String[]=[];
  reportId;
  slideSoloOpts={
    allowSlideNext:false,
    allowSlidePrev:false
  }
  url:string=URL;
  constructor( private reportsService: ReportsService,
    private router: ActivatedRoute,
    public modalController: ModalController,
    private commentsService:CommentsService
    ) {

    this.reportId = this.router.snapshot.paramMap.get('idReport');
    
  }
  async ngOnInit() {
    
      this.reportsService.getReport(this.reportId).subscribe((data)=>{      
      this.report=data.report[0];
      this.user=this.report.user;
      this.imgsR.push(...this.report.imgs);     

      });
      this.commentsService.getComments(this.reportId).subscribe((resp)=>{
        this.comments.push(...resp.comments);
        console.log(this.comments);
      });
   
      this.commentsService.newComment.subscribe((comment)=>{
        this.comments.push(comment);
      })


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
 
}
