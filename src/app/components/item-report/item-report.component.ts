import { Component, Input, OnInit } from '@angular/core';
import { Report, Usuario } from 'src/app/interfaces/interfaces';
import { CommentsService } from 'src/app/services/comments.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-item-report',
  templateUrl: './item-report.component.html',
  styleUrls: ['./item-report.component.scss'],
})
export class ItemReportComponent implements OnInit {
@Input() report: Report={};
comments= [];
user: Usuario = {
  image:''
};

  constructor(private commentsService:CommentsService,
    private usuarioService: UsuarioService) { }

  ngOnInit(
    
  ) {
    this.user = this.usuarioService.getUsuario();

    this.commentsService.getComments(this.report._id).subscribe((resp)=>{
      this.comments.push(...resp.comments);
      
    });
  }

}
