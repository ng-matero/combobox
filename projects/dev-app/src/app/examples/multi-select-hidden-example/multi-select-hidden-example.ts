import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelect } from '@ng-matero/ng-select';
import { DataService } from '../data.service';

@Component({
  selector: 'app-multi-select-hidden-example',
  templateUrl: './multi-select-hidden-example.html',
  styleUrl: './multi-select-hidden-example.scss',
  imports: [NgSelect, FormsModule, AsyncPipe],
})
export class MultiSelectHiddenExample {
  private dataService = inject(DataService);
  people$ = this.dataService.getPeople();
  selectedPeople = [];
}
