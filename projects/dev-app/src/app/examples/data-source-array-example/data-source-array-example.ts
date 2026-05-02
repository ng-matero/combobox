import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelect } from '@ng-matero/ng-select';
import { DataService } from '../data.service';

@Component({
  selector: 'app-data-source-array-example',
  templateUrl: './data-source-array-example.html',
  styleUrl: './data-source-array-example.scss',
  imports: [NgSelect, FormsModule, AsyncPipe],
})
export class DataSourceArrayExample {
  private dataService = inject(DataService);
  people$ = this.dataService.getPeople();
  selectedPersonId = '5a15b13c36e7a7f00cf0d7cb';

  simpleItems = [true, 'Two', 3];
  selectedSimpleItem = 'Two';
}
