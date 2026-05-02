import { UpperCasePipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { NgSelect, NgSelectOptgroupTemplate, NgSelectOptionTemplate } from '@ng-matero/ng-select';
import { map } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-multi-checkbox-group-example',
  templateUrl: './multi-checkbox-group-example.html',
  styleUrl: './multi-checkbox-group-example.scss',
  imports: [NgSelect, FormsModule, NgSelectOptgroupTemplate, NgSelectOptionTemplate, UpperCasePipe],
})
export class MultiCheckboxGroupExample {
  private dataService = inject(DataService);

  people = toSignal(this.dataService.getPeople().pipe(map(x => x.filter(y => !y.disabled))), {
    initialValue: [],
  });

  selectedPeople = signal<string[]>([]);

  constructor() {
    effect(() => {
      const data = this.people();
      if (data.length >= 1) {
        this.selectedPeople.set([data[0].id]);
      }
    });
  }
}
