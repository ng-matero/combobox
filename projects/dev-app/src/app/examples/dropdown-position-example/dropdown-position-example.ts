import { Component } from '@angular/core';
import { NgSelect } from '@ng-matero/ng-select';

@Component({
  selector: 'app-dropdown-position-example',
  templateUrl: './dropdown-position-example.html',
  styleUrl: './dropdown-position-example.scss',
  imports: [NgSelect],
})
export class DropdownPositionExample {
  cities = [
    { value: 1, label: 'Vilnius' },
    { value: 2, label: 'Kaunas' },
    { value: 3, label: 'Pavilnys' },
  ];
}
