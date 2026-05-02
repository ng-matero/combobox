import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelect } from '@ng-matero/ng-select';
import { catchError, concat, distinctUntilChanged, of, Subject, switchMap, tap } from 'rxjs';
import { DataService, Person } from '../data.service';

@Component({
  selector: 'app-search-autocomplete-example',
  templateUrl: './search-autocomplete-example.html',
  styleUrl: './search-autocomplete-example.scss',
  imports: [NgSelect, FormsModule, AsyncPipe, JsonPipe],
})
export class SearchAutocompleteExample {
  private dataService = inject(DataService);

  peopleInput$ = new Subject<string>();

  peopleLoading = false;

  people$ = concat(
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

  selectedPersons: any[] = [
    { id: '0', name: 'Karyn Wright' },
    { id: '1', name: 'Other' },
  ];

  trackByFn = (item: Person) => item.id;
}
