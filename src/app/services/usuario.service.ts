import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { RespuestaPosts, RespuestaUsers, Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { UiServiceService } from './ui-service.service';
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from '@ionic-native/file-transfer/ngx';

const URL = environment.url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  token: string = null;
  img: string = '';
  private usuario: Usuario = {};
  newURL = new EventEmitter<string>();

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController,
    private fileTransfer: FileTransfer
  ) {}

  login(email: string, password: string) {
    const data = { email, password };

    return new Promise((resolve) => {
      this.http.post(`${URL}/user/login`, data).subscribe(async (resp) => {
        console.log(resp);
        if (resp['ok'] == true) {
          await this.guardarToken(resp['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  logout() {
    this.token = null;
    this.usuario = null;

    this.storage.clear();

    this.navCtrl.navigateRoot('/login-i', { animated: true });
  }

  registro(usuario: Usuario) {
    return new Promise((resolve) => {
      this.http.post(`${URL}/user/create`, usuario).subscribe(async (resp) => {
        console.log(resp);
        if (resp['ok'] == true) {
          await this.guardarToken(resp['token']);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  getUsuario() {
    if (!this.usuario._id) {
      this.validaToken();
    }

    return { ...this.usuario };
  }

  async guardarToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);
    await this.validaToken();
  }
  async cargarTokenStorage() {
    this.token = (await this.storage.get('token')) || null;
  }

  async roleUser(role = 'USER'): Promise<boolean> {
    await this.cargarTokenStorage();
    if (!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }
    return new Promise<boolean>((resolve) => {
      const headers = new HttpHeaders({
        'x-token': this.token,
      });
      this.http.get(`${URL}/user/`, { headers }).subscribe((resp) => {
        if (resp['ok']) {
          console.log(resp['usuario'].type);
          if (role === resp['usuario'].type) {
            this.navCtrl.navigateRoot('/main/tabs/tab1');
            resolve(false);
          } else {
            resolve(true);
          }
        }
      });
    });
  }

  async validaToken(): Promise<boolean> {
    await this.cargarTokenStorage();

    if (!this.token) {
      this.navCtrl.navigateRoot('/login-i');
      return Promise.resolve(false);
    }

    return new Promise<boolean>((resolve) => {
      const headers = new HttpHeaders({
        'x-token': this.token,
      });
      this.http.get(`${URL}/user/`, { headers }).subscribe(
        (resp) => {
          if (resp['ok']) {
            this.usuario = resp['usuario'];
            resolve(true);
          } else {
            this.navCtrl.navigateRoot('/login-i');

            resolve(false);
          }
        }/* ,
        (err: any) => {
          console.log('Error: ', err);
          this.navCtrl.navigateRoot('/error-network');
        } */
      );
    });
  }

  actualizarUsuario(usuario: Usuario) {
    const headers = new HttpHeaders({
      'x-token': this.token,
    });
    return new Promise((resolve, reject) => {
      this.http
        .post(`${URL}/user/update`, usuario, { headers })
        .subscribe((resp) => {
          if (resp['ok']) {
            this.guardarToken(resp['token']);
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }

  subirImagen(img: string): Promise<string> {
    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {
        'x-token': this.token,
      },
    };
    return new Promise((resolve, reject) => {
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
     
      fileTransfer
        .upload(img, `${URL}/user/upload`, options)
        .then((data) => {

          this.img = data.response;
          this.newURL.emit(data.response);
          resolve(data.response);
        })
        .catch((err) => {
          console.log('Error de carga: ', err);
          resolve('profile.png');
        });
    });
  }

  getURL(userId: String, img: String) {
    if(img=='profile.png'){
      return './assets/no-image.png';
    }else{

      return `${URL}/user/image/${userId}/${img}`;
    }
    
  }

  getListUsers(type){
    const headers = new HttpHeaders({
      'x-token': this.token
    });

   return this.http.post<RespuestaUsers>(`${URL}/user/list/`,{type},{ headers });
  }

  getListUsersSearch(search){
    const headers = new HttpHeaders({
      'x-token': this.token
    });

   return this.http.get<RespuestaUsers>(`${URL}/user/search/${search}`,{ headers });
  }
}
