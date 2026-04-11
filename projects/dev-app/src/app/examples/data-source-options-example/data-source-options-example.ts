import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectOption, NgSelect } from '@ng-matero/ng-select';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-data-source-options-example',
  templateUrl: './data-source-options-example.html',
  styleUrl: './data-source-options-example.scss',
  imports: [NgSelect, FormsModule, NgSelectOption, JsonPipe],
})
export class DataSourceOptionsExample implements OnInit {
  selectedCars = [3];
  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab', disabled: true },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];

  ngOnInit() {}

  toggleDisabled() {
    const car: any = this.cars[1];
    car.disabled = !car.disabled;
  }
}
