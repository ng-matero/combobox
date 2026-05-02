import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelect } from '@ng-matero/ng-select';
import { DataService, Person } from '../data.service';

@Component({
  selector: 'app-multi-select-limit-example',
  templateUrl: './multi-select-limit-example.html',
  styleUrl: './multi-select-limit-example.scss',
  imports: [NgSelect, FormsModule, AsyncPipe],
})
export class MultiSelectLimitExample {
  private dataService = inject(DataService);

  people$ = this.dataService.getPeople();
  selectedPeople: Person[] = [];

  clearModel() {
    this.selectedPeople = [];
  }
}
