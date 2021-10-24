import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login-i',
  templateUrl: './login-i.page.html',
  styleUrls: ['./login-i.page.scss'],
})
export class LoginIPage implements OnInit {
  user = {
    email: '',
    password: '',
  };
  focused: boolean;

  constructor(
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private uiService: UiServiceService
  ) {}

  ngOnInit() {}

  onBlur(event: any) {
    const value = event.target.value;

    if (!value) {
      this.focused = false;
    }
  }

  async login(fLogin: NgForm) {
    if(fLogin.invalid){
      //Completar los campos
      this.uiService.alertaInfo("Campos incompletos.") 
      return;}
    if (this.user.email === '' || this.user.password === '') {
      //mostrar alerta de usuario incorrecto
      this.uiService.alertaInfo('Todos los campos deben estar completos.');
    } else {
      const valido = await this.usuarioService.login(
        this.user.email,
        this.user.password
      );

      if (valido) {
        //Navegar al tab
        this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
      } else {
        //mostrar alerta de usuario incorrecto
        this.uiService.alertaInfo('Usario y contraseña son incorrectos.');
      }
    }
  }
}
