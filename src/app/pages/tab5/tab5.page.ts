import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  select(option){
    console.log(option);
    if(option===1){
      this.router.navigate(['/list-admin/']);
    }
    if(option===2){
      this.router.navigate(['/list-editor/']);
    }
    if(option===3){
      this.router.navigate(['/type-reports/']);
    }
  }

}
