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
}
