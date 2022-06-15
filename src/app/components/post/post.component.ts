import { Component, Input, OnInit } from '@angular/core';
import { Post, Usuario } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
const URL = environment.url;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post: Post={
    user:{},
    likes:[]
  };
  user: Usuario = {
    image:''
  };

  likes:number=0;
  liked:boolean=false;
  slideSoloOpts={
    allowSlideNext:false,
    allowSlidePrev:false
  }
  url:string=URL;
  constructor(
    private postsService: PostsService,
    private usuarioService: UsuarioService,
    ) { 
    
    
  }

  ngOnInit() {
    this.user = this.usuarioService.getUsuario();
    this.likes=this.post.likes.length;

    if(this.post.likes.includes(this.user._id)){      
      this.liked=true;
    }else{
      this.liked=false;
    }
  }

  async like(postId){
    console.log(this.likes);    
     let data= await this.postsService.like(postId);
     console.log(data);
    this.liked=true;
    this.likes++;     
  }

  async dislike(postId){
    console.log(this.likes);

    let data= await this.postsService.dislike(postId);
    console.log(data);
    this.liked=false;
    this.likes--;

  }



}
