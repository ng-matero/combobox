import { Component, inject, OnInit } from '@angular/core';
import { NgSelect } from '@ng-matero/ng-select';
import { DataService, Person } from '../data.service';

@Component({
  selector: 'app-search-default-example',
  templateUrl: './search-default-example.html',
  styleUrl: './search-default-example.scss',
  imports: [NgSelect],
})
export class SearchDefaultExample implements OnInit {
  people: Person[] = [];
  peopleLoading = false;

  private dataService = inject(DataService);

  ngOnInit() {
    this.loadPeople();
  }

  private loadPeople() {
    this.peopleLoading = true;
    this.dataService.getPeople().subscribe(x => {
      this.people = x;
      this.peopleLoading = false;
    });
  }
}
