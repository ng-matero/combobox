import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { NgSelect } from '@ng-matero/ng-select';

@Component({
  selector: 'app-bindings-custom-example',
  templateUrl: './bindings-custom-example.html',
  styleUrl: './bindings-custom-example.scss',
  imports: [NgSelect, FormsModule, JsonPipe],
})
export class BindingsCustomExample implements OnInit {
  cities = [
    { id: 1, name: 'Vilnius' },
    { id: 2, name: 'Kaunas' },
    { id: 3, name: 'Pavilnys', disabled: true },
  ];
  selectedCityId: number | null = null;

  ngOnInit() {
    this.selectedCityId = this.cities[0].id;
  }
}
