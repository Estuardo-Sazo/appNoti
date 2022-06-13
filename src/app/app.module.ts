import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SwiperModule } from 'swiper/angular';
import { PipesModule } from './pipes/pipes.module';

import { ReactiveFormsModule, FormsModule} from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
     IonicModule.forRoot(),
     AppRoutingModule,
     HttpClientModule,
     SwiperModule,
     PipesModule,
     IonicStorageModule.forRoot(),
     ReactiveFormsModule,
     FormsModule
    ],
  providers: [
    Geolocation,
    Camera,
    FileTransfer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
