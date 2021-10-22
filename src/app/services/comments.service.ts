import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaComments } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
const URL =environment.url;
@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  newComment = new EventEmitter<Comment>();
  constructor(private http: HttpClient,
    private usuarioService: UsuarioService,) { }

    getComments(ref){
      const headers = new HttpHeaders({
        'x-token': this.usuarioService.token
      });

     return this.http.get<RespuestaComments>(`${URL}/comments/${ref}`,{ headers });
    }
  

createReport(comment, ref) {
  const headers = new HttpHeaders({
    'x-token': this.usuarioService.token
  });

  return new Promise(resolve => {
    this.http.post(`${URL}/comments/${ref}`, comment, { headers })
      .subscribe(resp => {
        console.log(resp);
        if (resp['ok'] == true) {
          this.newComment.emit(resp['comment']);
          resolve(true);

        }else{
        resolve(false);
        }
      });
  });

}

}