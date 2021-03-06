import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';
import { UiServiceService } from './ui-service.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  token: string = null;
  private usuario: Usuario = {};

  constructor(private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController

  ) { }

  login(email: string, password: string) {
    const data = { email, password };

    return new Promise((resolve) => {
     /*  this.http.get('https://pagos-web.000webhostapp.com/api/users/').subscribe((res) => {
        console.log(res);
        resolve(false);
      }); */
      this.http.post(`${URL}/user/login`, data).subscribe( async (resp) => {
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

  logout(){
    this.token=null;
    this.usuario=null;

    this.storage.clear();

    this.navCtrl.navigateRoot('/login', { animated:true});
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
    console.log(this.usuario);
    console.log(this.token);

    
    return { ...this.usuario };
  }

  async guardarToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);
    await this.validaToken();
  }
  async cargarTokenStorage() {
    this.token = await this.storage.get('token') || null;
  }

  async validaToken(): Promise<boolean> {

    await this.cargarTokenStorage();

    if (!this.token) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {
      const headers = new HttpHeaders({
        'x-token': this.token
      });
      this.http.get(`${URL}/user/`, { headers })
        .subscribe(resp => {
          
          if (resp['ok']) {
            this.usuario = resp['usuario'];
            console.log(this.usuario);
            
            resolve(true);

          } else {
            this.navCtrl.navigateRoot('/login');

            resolve(false);
          }
        });
    });
  }

  actualizarUsuario(usuario: Usuario) {
    const headers = new HttpHeaders({
      'x-token': this.token
    });
    return new Promise((resolve, reject) => {

      this.http.post(`${URL}/user/update`, usuario, { headers })
        .subscribe(resp => {
          if (resp['ok']) {
            this.guardarToken(resp['token']);
            resolve(true);
          } else {
            resolve(false);
          }
        });

    });
  }
}
