import { Component, inject, OnInit } from '@angular/core';
import { NgSelectOptionTemplate, NgSelect } from '@ng-matero/ng-select';
import { DataService, Person } from '../data.service';

@Component({
  selector: 'app-search-custom-example',
  templateUrl: './search-custom-example.html',
  styleUrl: './search-custom-example.scss',
  imports: [NgSelect, NgSelectOptionTemplate],
})
export class SearchCustomExample implements OnInit {
  people: Person[] = [];
  peopleLoading = false;

  private dataService = inject(DataService);

  ngOnInit() {
    this.loadPeople();
  }

  customSearchFn(term: string, item: Person) {
    term = term.toLowerCase();
    return item.name.toLowerCase().indexOf(term) > -1 || item.gender.toLowerCase() === term;
  }

  private loadPeople() {
    this.peopleLoading = true;
    this.dataService.getPeople().subscribe(x => {
      this.people = x;
      this.peopleLoading = false;
    });
  }
}
