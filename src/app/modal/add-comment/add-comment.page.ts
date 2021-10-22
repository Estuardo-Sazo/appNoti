import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Comment, Report } from 'src/app/interfaces/interfaces';
import { CommentsService } from 'src/app/services/comments.service';
@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.page.html',
  styleUrls: ['./add-comment.page.scss'],
})
export class AddCommentPage implements OnInit {
  @Input() report: Report;
  comment:Comment={
   comment:'',
   reference:''
  };
  constructor(public modalController: ModalController,
              private commentsService:CommentsService
    ) { }

  ngOnInit() {
    console.log(this.report);
    
  }

  async enviar(fComment:NgForm){
    const creado=await this.commentsService.createReport(this.comment,this.report._id);
    this.comment={
      comment:'',
      reference:''
     };
     this.dismiss();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
