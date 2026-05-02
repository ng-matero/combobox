import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import {
  NgSelect,
  NgSelectPanelFooterTemplate,
  NgSelectPanelHeaderTemplate,
} from '@ng-matero/ng-select';
import { DataService, Person } from '../data.service';

@Component({
  selector: 'app-template-header-footer-example',
  templateUrl: './template-header-footer-example.html',
  styleUrl: './template-header-footer-example.scss',
  imports: [NgSelect, FormsModule, NgSelectPanelHeaderTemplate, NgSelectPanelFooterTemplate],
})
export class TemplateHeaderFooterExample {
  private dataService = inject(DataService);

  people = toSignal(this.dataService.getPeople(), { initialValue: [] as Person[] });

  selectedPeople = signal<string[]>([]);

  selectAll() {
    this.selectedPeople.set(this.people().map(x => x.name));
  }

  unselectAll() {
    this.selectedPeople.set([]);
  }
}
