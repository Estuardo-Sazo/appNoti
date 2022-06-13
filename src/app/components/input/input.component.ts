import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() label: string;
  @Input() type = 'text';
  @Input() name = 'text';
  @Input() model : any;
  @Output() changeModel = new EventEmitter<string>();

 	//allow negative numbers to be used
   @Input('allow-negative') allowNegative: boolean = false; //this is set to false everywhere possible

   //emit the number from the input on change
   @Output('app-input') change = new EventEmitter<string>();


  constructor() { }

  ngOnInit() {}

  onChange() {
    this.change.emit(String(this.model));
  }

 

  focused: boolean;

  onBlur(event: any) {
    const value = event.target.value;

    if (!value) {
      this.focused = false;
    }
  }
}
