import { Component, OnInit } from '@angular/core';

import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

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
    private uiService: UiServiceService,
    public formbuider: FormBuilder,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
  ) {}

  
  validationUserMessage ={
    email:[
      {type:"required", message:"Por favor ingresa tu correo electrónico"},
      {type:"pattern", message:"Por favor, el correo electrónico ingresado es incorrecto. Intentar otra vez.."},
    
    ],
    password:[
      {type:"required", message:"Por favor ingresa tu contraseña"},
      {type:"minlength", message:"La contraseña debe tener al menos  6 caracteres"}

    ]
  }

  loading:any;

  validationFormUser: FormGroup;

  ngOnInit() {

    this.validationFormUser = this.formbuider.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    });
  }

  onBlur(event: any) {
    const value = event.target.value;

    if (!value) {
      this.focused = false;
    }
  }

  async login(value) {
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
        this.loading.dismiss();
        this.uiService.alertaInfo('Usario y contraseña son incorrectos.');
      }
    }
  }

  async showalert() {
     this.loading = await this.loadingCtrl.create({
      message: "Por favor espere...",

    });
    this.loading.present();
  }

}


