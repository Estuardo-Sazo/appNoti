import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaTypeReport } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';


const URL =environment.url;

@Injectable({
  providedIn: 'root'
})
export class TypeReportService {

  constructor(

    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  getTypeReport(){
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });
   return this.http.get<RespuestaTypeReport>(`${URL}/type-report/`,{ headers });
  }


  createTypeReport(name) {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });
  
    return new Promise(resolve => {
      this.http.post(`${URL}/type-report/`, {name}, { headers })
        .subscribe(resp => {
          console.log(resp);
          if (resp['ok'] == true) {
            resolve(true);  
          }else{
          resolve(false);
          }
        });
    });
  
  }

  deleteTypeReport(id) {
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });
    return new Promise((resolve, reject) => {
      this.http
        .post(`${URL}/type-report/update/delete`, {_id:id}, { headers })
        .subscribe((resp) => {
          if (resp['ok']) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }
}
