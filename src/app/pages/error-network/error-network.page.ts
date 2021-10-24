import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-network',
  templateUrl: './error-network.page.html',
  styleUrls: ['./error-network.page.scss'],
})
export class ErrorNetworkPage implements OnInit {
cargar=false;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  reconnect(){
    console.log('reconnet');
    this.cargar=true;
    this.router.navigateByUrl('/main/tabs/tab1');

  }
}
