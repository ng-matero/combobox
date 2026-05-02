import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import {
  NgSelect,
  NgSelectLoadingTextTemplate,
  NgSelectNotFoundTemplate,
  NgSelectTypeToSearchTemplate,
} from '@ng-matero/ng-select';
import { catchError, debounceTime, distinctUntilChanged, of, Subject, switchMap } from 'rxjs';
import { DataService, Person } from '../data.service';

@Component({
  selector: 'app-template-display-example',
  templateUrl: './template-display-example.html',
  styleUrl: './template-display-example.scss',
  imports: [
    NgSelect,
    FormsModule,
    NgSelectTypeToSearchTemplate,
    NgSelectNotFoundTemplate,
    NgSelectLoadingTextTemplate,
  ],
})
export class TemplateDisplayExample {
  private dataService = inject(DataService);

  peopleTypeahead = new Subject<string>();

  serverSideFilterItems = toSignal(
    this.peopleTypeahead.pipe(
      distinctUntilChanged(),
      debounceTime(300),
      switchMap(term =>
        this.dataService.getPeople(term).pipe(
          catchError(err => {
            console.error(err);
            return of([] as Person[]);
          })
        )
      )
    ),
    { initialValue: [] }
  );

  selectedPeople = signal<Person[]>([]);
}
