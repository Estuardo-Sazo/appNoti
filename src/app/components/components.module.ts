import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { IonicModule } from '@ionic/angular';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';



@NgModule({
  declarations: [
    PostComponent,
    PostsComponent,
    AvatarSelectorComponent 
  ],
  exports:[
    PostsComponent,
    AvatarSelectorComponent
    
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
