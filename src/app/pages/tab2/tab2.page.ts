import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  tempImages: string[] = [];
  post = {
    mensaje: '',
    coords: null,
    posicion: false
  };

  constructor(private postsService: PostsService,
  private router: Router) { }

  async crearPost() {
    console.log(this.post);
    const creado=await this.postsService.createPost(this.post);
    this.post ={
      mensaje: '',
      coords: null,
      posicion: false
    };
    this.router.navigateByUrl('/main/tabs/tab1');
  }
}
