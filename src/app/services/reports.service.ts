import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable ,EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaReport,Report, GetReport } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

const URL =environment.url;
@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  newReport = new EventEmitter<Report>();
  delReport = new EventEmitter<Report>();

 
  pagina=0;
  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private fileTransfer: FileTransfer


  ) { }

  getReports(pull: boolean=false){

    if(pull){
      this.pagina=0;
    }
    this.pagina++;
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });
   return this.http.get<RespuestaReport>(`${URL}/reports/?pagina=${this.pagina}`,{ headers });
  }

  getReport(id){
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });
   return this.http.get<GetReport>(`${URL}/reports/${id}`,{ headers });
  }


  createReport(report) {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return new Promise(resolve => {

      this.http.post(`${URL}/reports`, report, { headers })
        .subscribe(resp => {
          console.log(resp);
          if (resp['ok'] == true) {
            this.newReport.emit(resp['report']);
            resolve(true);

          }else{
          resolve(false);

          }
        });
    });

  }

  deleteReport(id) {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return new Promise(resolve => {

      this.http.post(`${URL}/reports/delete/${id}`, {},{ headers })
        .subscribe(resp => {
          console.log(resp);
          if (resp['ok'] == true) {
            this.delReport.emit(resp['report']);
            resolve(true);

          }else{
          resolve(false);

          }
        });
    });

  }

  subirImagen(img: string) {
    const options: FileUploadOptions={
      fileKey:'image',
      headers: {
        'x-token': this.usuarioService.token
      }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload(img, `${URL}/reports/upload`, options).then(data => {
      console.log(data);

    }).catch(err => {
      console.log('Error de carga: ', err);

    });
  }
}
