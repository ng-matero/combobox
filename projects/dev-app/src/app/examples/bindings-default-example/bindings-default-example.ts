import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { NgSelect } from '@ng-matero/ng-select';

@Component({
  selector: 'app-bindings-default-example',
  templateUrl: './bindings-default-example.html',
  styleUrl: './bindings-default-example.scss',
  imports: [NgSelect, FormsModule, JsonPipe],
})
export class BindingsDefaultExample implements OnInit {
  defaultBindingsList = [
    { value: 1, label: 'Vilnius' },
    { value: 2, label: 'Kaunas' },
    { value: 3, label: 'Pavilnys', disabled: true },
  ];

  selectedCity: any = null;

  ngOnInit() {
    this.selectedCity = this.defaultBindingsList[0];
  }
}
