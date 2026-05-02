import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelect, NgSelectOption } from '@ng-matero/ng-select';

@Component({
  selector: 'app-data-source-options-example',
  templateUrl: './data-source-options-example.html',
  styleUrl: './data-source-options-example.scss',
  imports: [NgSelect, FormsModule, NgSelectOption, JsonPipe],
})
export class DataSourceOptionsExample {
  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab', disabled: true },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];
  selectedCars = [3];

  toggleDisabled() {
    const car = this.cars[1];
    car.disabled = !car.disabled;
  }
}
