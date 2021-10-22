import { Component, Input, OnInit } from '@angular/core';
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
  constructor() { }

  ngOnInit() {
    console.log(this.comment);
    
  }

}
