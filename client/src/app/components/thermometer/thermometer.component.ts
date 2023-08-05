import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.css']
})
export class ThermometerComponent implements OnInit {
  //Define Input fields and bind them to the template.
  @Input() name:string;
  @Input() percentStr:string;
  @Input() color:string;

  constructor() { }

  ngOnInit() {
  }

}
