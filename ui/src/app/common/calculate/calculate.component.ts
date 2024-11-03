import { Component } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrl: './calculate.component.css'
})
export class CalculateComponent {

  num1: number = 0;
  num2: number = 0;
  result: number | null = null;

  constructor(private appService: AppService) { }

  onCalculate() {
    this.appService.calculateSum(this.num1, this.num2).subscribe(result => this.result = result);
  }
}
