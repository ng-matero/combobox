import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelect } from '@ng-matero/ng-select';

@Component({
  selector: 'app-bindings-nested-example',
  templateUrl: './bindings-nested-example.html',
  styleUrl: './bindings-nested-example.scss',
  imports: [NgSelect, FormsModule],
})
export class BindingsNestedExample {
  countries = [
    { id: 1, nested: { countryId: 'L', name: 'Lithuania' } },
    { id: 2, nested: { countryId: 'U', name: 'USA' } },
    { id: 3, nested: { countryId: 'A', name: 'Australia' } },
  ];
  selectedCountryId = this.countries[0].nested.countryId;
}
