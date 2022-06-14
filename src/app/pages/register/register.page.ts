import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  register: Usuario = {
    email: '',
    password: '',
    names: "",
    surnames: "",
    cui: "",
    phone: "",
    confirm: "",
  };
  data = {
    input1: '',
    input2: '',
  };
  focused: boolean;

  constructor(
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private uiService: UiServiceService,
    public formbuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private navCtr: NavController
  ) {

    this.loading = this.loadingCtrl;
  }



  /*  ngOnInit() {
   } */
  onBlur(event: any) {
    const value = event.target.value;

    if (!value) {
      this.focused = false;
    }
  }

  async registr(fRegistro: NgForm) {

    console.log(this.data);

    /* if(fRegistro.invalid){
      //Completar los campos
      this.uiService.alertaInfo("Campos incompletos.") 
      return;}
      console.log(this.register.cui.toString().length);
      
      if(this.register.cui.toString().length!=13 ){
        this.uiService.alertaInfo("DPI invalido") 
        return;}

      if(this.register.password == this.register.confirm){
        

        const valido= await this.usuarioService.registro(this.register);

            if(valido){
              //Navegar al tab 
                this.navCtrl.navigateRoot('/main/tabs/tab1',{animated:true});
            }else{
              //mostrar alerta de usuario incorrecto
              this.uiService.alertaInfo("Error en los datos.")
              
            }
      }else{
        //mostrar alerta de usuario incorrecto
        this.uiService.alertaInfo("Contraseñas no coinsiden.");
      } */

  }


  validationMessages = {
    name: [{ type: "required", message: "Por favor ingresa tu nombre" }],
    surname: [{ type: "required", message: "Por favor ingresa tu apellido" }],
    phone: [{ type: "pattern", message: "Por favor ingrese un número de teléfono válido" }],
    email: [
      { type: 'required', message: "Por favor ingresa tu correo electrónico" },
      { type: "pattern", meesage: "Por favor, el correo electrónico ingresado es incorrecto. Intentar otra vez.." }
    ],
    password: [
      { type: "required", message: "Por favor ingresa tu contraseña" },
      { type: "minlength", message: "La contraseña debe tener al menos  6 caracteres y debe contener(Mayúsculas, números y símbolos especiales)" },
      { type: "pattern", meesage: "La contraseña debe contener(Mayúsculas, números y símbolos especiales)" }
    ]
  }

  ValidationFormUSer: FormGroup;
  loading: any;


  ngOnInit() {
    this.ValidationFormUSer = this.formbuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      surname: new FormControl('', Validators.compose([
        Validators.required
      ])),

      phone: new FormControl('', Validators.compose([
        Validators.pattern('[- +()0-9]+')
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),

      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z0-9$@$!%*?&].{8,}'),
        Validators.minLength(6),

      ]))

    });

  }

  registerUser(value) {
    this.showalert();
    console.log(value);
    
    /* if(fRegistro.invalid){
      //Completar los campos
      this.uiService.alertaInfo("Campos incompletos.") 
      return;}
      console.log(this.register.cui.toString().length);
      
      if(this.register.cui.toString().length!=13 ){
        this.uiService.alertaInfo("DPI invalido") 
        return;}

      if(this.register.password == this.register.confirm){
        

        const valido= await this.usuarioService.registro(this.register);

            if(valido){
              //Navegar al tab 
                this.navCtrl.navigateRoot('/main/tabs/tab1',{animated:true});
            }else{
              //mostrar alerta de usuario incorrecto
              this.uiService.alertaInfo("Error en los datos.")
              
            }
      }else{
        //mostrar alerta de usuario incorrecto
        this.uiService.alertaInfo("Contraseñas no coinsiden.");
      }  */


    /* try {
      this.authService.userRegistration(value).then(response => {
        console.log(response);
        if (response.user) {
          response.user.updateProfile({
            displayName: value.names,
            email: value.email,
            phoneNumber: value.phone

          });
          this.preference.store(value.phone, 'userPhoneNumber');
          this.loading.dismiss();
          this.router.navigate(['loginscreen']);
        }
      }, error => {
        this.loading.dismiss();
        this.errorLoading(error.message);

      })
    } catch (erro) {
      console.log(erro)
    } */
  }


  async errorLoading(message: any) {
    const loading = await this.alertCtrl.create({
      header: "Error Registering",
      message: message,
      buttons: [{
        text: 'ok',
        handler: () => {
          this.navCtr.navigateBack(['signup'])
        }
      }]
    })
    await loading.present();
  }




  async showalert() {
    var load = await this.loadingCtrl.create({
      message: "please wait....",

    })
    load.present();
  }

  /* LoginUser(value){
    console.log("Am logged in");
    try{
       this.authservice.loginFireauth(value).then( resp =>{
         console.log(resp);
      //  this.router.navigate(['tabs'])
   
       if(resp.user){
  
         this.authservice.setUser({
           username : resp.user.displayName,
           uid: resp.user.uid
         })
  
        const userProfile = this.firestore.collection('profile').doc(resp.user.uid);
  
         userProfile.get().subscribe( result=>{
  
          if(result.exists){
            this.nav.navigateForward(['tabs']);
          }else{
  
            this.firestore.doc(`profile/${this.authservice.getUID()}`).set({
              name: resp.user.displayName,
              email: resp.user.email
            });
  
             this.nav.navigateForward(['uploadimage']);
          }
         })
       }
    
         
       })
    }catch(err){
      console.log(err);
    }
  } */



}
