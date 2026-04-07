# Combobox

[![npm](https://img.shields.io/npm/v/@ng-matero/ng-select.svg)](https://www.npmjs.com/package/@ng-matero/ng-select)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/ng-matero/combobox/blob/main/LICENSE)

Angular Select - Lightweight all in one UI Select, Multiselect and Autocomplete

## Installation

```bash
npm install @ng-matero/ng-select --save
```

## Usage

```ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-matero/ng-select';

@Component({
  selector: 'your-app',
  template: `
    <ng-select [items]="cars" bindLabel="name" bindValue="id" [(ngModel)]="selectedCars" />
  `,
  imports: [FormsModule, NgSelectModule],
})
export class YourAppComponent {
  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab', disabled: true },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];
  selectedCars = 3;
}
```

## License

MIT
