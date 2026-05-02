import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelect } from '@ng-matero/ng-select';
import { DataService } from '../data.service';

interface Event {
  name: string;
  value: any;
}

@Component({
  selector: 'app-output-events-example',
  templateUrl: './output-events-example.html',
  styleUrl: './output-events-example.scss',
  imports: [NgSelect, FormsModule, JsonPipe, AsyncPipe],
})
export class OutputEventsExample {
  private dataService = inject(DataService);

  items$ = this.dataService.getPeople();
  selectedItems: string[] = [];

  events: Event[] = [];

  onChange(e: Event) {
    this.events.push({ name: '(change)', value: e });
  }

  onFocus(e: FocusEvent) {
    this.events.push({ name: '(focus)', value: e });
  }

  onBlur(e: FocusEvent) {
    this.events.push({ name: '(blur)', value: e });
  }

  onOpen() {
    this.events.push({ name: '(open)', value: null });
  }

  onClose() {
    this.events.push({ name: '(close)', value: null });
  }

  onAdd(e: Event) {
    this.events.push({ name: '(add)', value: e });
  }

  onRemove(e: Event) {
    this.events.push({ name: '(remove)', value: e });
  }

  onClear() {
    this.events.push({ name: '(clear)', value: null });
  }

  onScrollToEnd() {
    this.events.push({ name: '(scrollToEnd)', value: null });
  }

  onSearch(e: any) {
    this.events.push({ name: '(search)', value: e });
  }
}
