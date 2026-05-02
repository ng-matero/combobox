import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelect } from '@ng-matero/ng-select';
import { DataService } from '../data.service';

@Component({
  selector: 'app-multi-select-default-example',
  templateUrl: './multi-select-default-example.html',
  styleUrl: './multi-select-default-example.scss',
  imports: [NgSelect, FormsModule, AsyncPipe],
})
export class MultiSelectDefaultExample {
  private dataService = inject(DataService);

  people$ = this.dataService.getPeople();
  selectedPeople = [{ name: 'Karyn Wright' }];

  clearModel() {
    this.selectedPeople = [];
  }

  changeModel() {
    this.selectedPeople = [{ name: 'New person' }];
  }
}
