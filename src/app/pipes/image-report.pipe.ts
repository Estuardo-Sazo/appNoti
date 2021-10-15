import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
const URL= environment.url;
@Pipe({
  name: 'imageReport'
})
export class ImageReportPipe implements PipeTransform {

  transform(img: string,userId: string): string {
    return `${URL}/reports/image/${userId}/${img}`;
  }

}
