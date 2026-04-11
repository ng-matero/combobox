import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectClearButtonTemplate, NgSelect } from '@ng-matero/ng-select';

@Component({
  selector: 'app-template-clear-example',
  templateUrl: './template-clear-example.html',
  styleUrl: './template-clear-example.scss',
  imports: [NgSelect, FormsModule, NgSelectClearButtonTemplate],
})
export class TemplateClearExample {
  cities = [
    {
      id: 1,
      name: 'Clermont-Ferrand',
    },
    {
      id: 2,
      name: 'Chamalières',
    },
    {
      id: 3,
      name: 'Lyon',
    },
    {
      id: 4,
      name: 'Compiègne',
    },
  ];

  selectedCity = this.cities[0].name;
}
