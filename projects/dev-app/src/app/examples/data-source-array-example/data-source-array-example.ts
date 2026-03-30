import { Component, inject, OnInit } from '@angular/core';
import { DataService, Person } from '../data.service';
import { FormsModule } from '@angular/forms';
import { NgSelect } from '@ng-matero/ng-select';

@Component({
  selector: 'app-data-source-array-example',
  templateUrl: './data-source-array-example.html',
  styleUrl: './data-source-array-example.scss',
  imports: [NgSelect, FormsModule],
})
export class DataSourceArrayExample implements OnInit {
  people: Person[] = [];
  selectedPersonId = '5a15b13c36e7a7f00cf0d7cb';

  selectedSimpleItem = 'Two';
  simpleItems: any[] = [];

  private dataService = inject(DataService);

  ngOnInit() {
    this.dataService.getPeople().subscribe(items => (this.people = items));
    this.simpleItems = [true, 'Two', 3];
  }
}
