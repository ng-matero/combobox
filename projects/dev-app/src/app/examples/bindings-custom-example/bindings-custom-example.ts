import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelect } from '@ng-matero/ng-select';

@Component({
  selector: 'app-bindings-custom-example',
  templateUrl: './bindings-custom-example.html',
  styleUrl: './bindings-custom-example.scss',
  imports: [NgSelect, FormsModule, JsonPipe],
})
export class BindingsCustomExample {
  cities = [
    { id: 1, name: 'Vilnius' },
    { id: 2, name: 'Kaunas' },
    { id: 3, name: 'Pavilnys', disabled: true },
  ];
  selectedCityId = this.cities[0].id;
}
