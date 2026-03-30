import { Component, EventEmitter, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgLoadingTextTemplate,
  NgNotFoundTemplate,
  NgSelect,
  NgTypeToSearchTemplate,
} from '@ng-matero/ng-select';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DataService, Person } from '../data.service';

@Component({
  selector: 'app-template-display-example',
  templateUrl: './template-display-example.html',
  styleUrl: './template-display-example.scss',
  imports: [
    NgSelect,
    FormsModule,
    NgTypeToSearchTemplate,
    NgNotFoundTemplate,
    NgLoadingTextTemplate,
  ],
})
export class TemplateDisplayExample implements OnInit {
  peopleTypeahead = new EventEmitter<string>();
  serverSideFilterItems: Person[] = [];
  selectedPeople: Person[] = [];

  private dataService = inject(DataService);

  ngOnInit() {
    this.serverSideSearch();
  }

  private serverSideSearch() {
    this.peopleTypeahead
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
        switchMap(term => this.dataService.getPeople(term))
      )
      .subscribe(
        x => {
          this.serverSideFilterItems = x;
        },
        err => {
          console.log(err);
          this.serverSideFilterItems = [];
        }
      );
  }
}
