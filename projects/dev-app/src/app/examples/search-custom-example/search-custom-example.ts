import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgSelect, NgSelectOptionTemplate } from '@ng-matero/ng-select';
import { finalize } from 'rxjs';
import { DataService, Person } from '../data.service';

@Component({
  selector: 'app-search-custom-example',
  templateUrl: './search-custom-example.html',
  styleUrl: './search-custom-example.scss',
  imports: [NgSelect, NgSelectOptionTemplate],
})
export class SearchCustomExample {
  private dataService = inject(DataService);

  peopleLoading = signal(true);

  people = toSignal(
    this.dataService.getPeople().pipe(finalize(() => this.peopleLoading.set(false))),
    { initialValue: [] }
  );

  customSearchFn(term: string, item: Person) {
    term = term.toLowerCase();
    return item.name.toLowerCase().indexOf(term) > -1 || item.gender.toLowerCase() === term;
  }
}
