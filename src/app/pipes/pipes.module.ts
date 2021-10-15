import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';
import { ImagenPipe } from './imagen.pipe';
import { ImageReportPipe } from './image-report.pipe';



@NgModule({
  declarations: [
    DomSanitizerPipe,
    ImageSanitizerPipe,
    ImagenPipe,
    ImageReportPipe,
    ImageReportPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImageSanitizerPipe,
    ImagenPipe,
    ImageReportPipe]
})
export class PipesModule { }
