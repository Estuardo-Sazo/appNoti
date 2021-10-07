import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';



@NgModule({
  declarations: [
    DomSanitizerPipe,
    ImageSanitizerPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [ImageSanitizerPipe]
})
export class PipesModule { }
