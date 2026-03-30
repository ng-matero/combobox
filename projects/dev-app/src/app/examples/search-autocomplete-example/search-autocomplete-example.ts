import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelect } from '@ng-matero/ng-select';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { DataService, Person } from '../data.service';

@Component({
  selector: 'app-search-autocomplete-example',
  templateUrl: './search-autocomplete-example.html',
  styleUrl: './search-autocomplete-example.scss',
  imports: [NgSelect, FormsModule, AsyncPipe, JsonPipe],
})
export class SearchAutocompleteExample implements OnInit {
  people$!: Observable<Person[]>;
  peopleLoading = false;
  peopleInput$ = new Subject<string>();
  selectedPersons: Person[] = [{ name: 'Karyn Wright' }, { name: 'Other' }] as any;

  private dataService = inject(DataService);

  ngOnInit() {
    this.loadPeople();
  }

  trackByFn(item: Person) {
    return item.id;
  }

  private loadPeople() {
    this.people$ = concat(
      of([]), // default items
      this.peopleInput$.pipe(
        distinctUntilChanged(),
        tap(() => (this.peopleLoading = true)),
        switchMap(term =>
          this.dataService.getPeople(term).pipe(
            catchError(() => of([])), // empty list on error
            tap(() => (this.peopleLoading = false))
          )
        )
      )
    );
  }
}
