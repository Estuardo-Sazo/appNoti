import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { IonicModule } from '@ionic/angular';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { MapaComponent } from './mapa/mapa.component';
import { PipesModule } from '../pipes/pipes.module';
import { CommentComponent } from './comment/comment.component';
import { CommentsComponent } from './comments/comments.component';
import { ItemReportComponent } from './item-report/item-report.component';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';
import { IconButtonComponent } from './icon-button/icon-button.component';



@NgModule({
  declarations: [
    PostComponent,
    PostsComponent,
    AvatarSelectorComponent,
    MapaComponent,
    CommentComponent,
    CommentsComponent,
    ItemReportComponent,
    InputComponent,
    ButtonComponent,
    IconButtonComponent
    
  ],
  exports:[
    PostsComponent,
    AvatarSelectorComponent,
    MapaComponent,
    CommentsComponent,
    ItemReportComponent,
    InputComponent,
    ButtonComponent,
    IconButtonComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
