import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgSelect } from '@ng-matero/ng-select';
import { finalize } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-search-default-example',
  templateUrl: './search-default-example.html',
  styleUrl: './search-default-example.scss',
  imports: [NgSelect],
})
export class SearchDefaultExample {
  private dataService = inject(DataService);

  peopleLoading = signal(true);

  people = toSignal(
    this.dataService.getPeople().pipe(finalize(() => this.peopleLoading.set(false))),
    { initialValue: [] }
  );
}
