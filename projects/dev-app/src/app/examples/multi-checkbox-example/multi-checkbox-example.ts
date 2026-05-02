import { JsonPipe, UpperCasePipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { NgSelect, NgSelectOptgroupTemplate, NgSelectOptionTemplate } from '@ng-matero/ng-select';
import { map } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-multi-checkbox-example',
  templateUrl: './multi-checkbox-example.html',
  styleUrl: './multi-checkbox-example.scss',
  imports: [
    FormsModule,
    NgSelect,
    NgSelectOptgroupTemplate,
    NgSelectOptionTemplate,
    UpperCasePipe,
    JsonPipe,
  ],
})
export class MultiCheckboxExample {
  private dataService = inject(DataService);

  people = toSignal(this.dataService.getPeople().pipe(map(x => x.filter(y => !y.disabled))), {
    initialValue: [],
  });

  selectedPeople = signal<string[]>([]);

  constructor() {
    effect(() => {
      const data = this.people();
      if (data.length >= 2) {
        this.selectedPeople.set([data[0].id, data[1].id]);
      }
    });
  }
}
